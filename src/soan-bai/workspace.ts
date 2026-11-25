type Mode = 'student' | 'teacher';
type Card = { title: string; body: string; notes: string; minutes: number; image: string; caption: string };
type Draft = { title: string; name: string; date: string; materials: string; cards: Card[] };

const maxSlides = 12;
const teacherStages = ['Khởi động', 'Hình thành kiến thức', 'Luyện tập', 'Vận dụng'];
const studentStages = ['Câu hỏi mở đầu', 'Cách tìm câu trả lời', 'Kết quả và giải thích', 'Câu hỏi vận dụng'];
const stagesInMinutes = [5, 20, 12, 8];

function validDraft(value: unknown): value is Draft {
  if (!value || typeof value !== 'object') return false;
  const draft = value as Draft;
  return [draft.title, draft.name, draft.date, draft.materials].every((field) => typeof field === 'string')
    && (!draft.date || /^\d{4}-\d{2}-\d{2}$/.test(draft.date) && Number.isFinite(Date.parse(draft.date)))
    && Array.isArray(draft.cards) && draft.cards.length >= 1 && draft.cards.length <= maxSlides
    && draft.cards.every((card) => card && [card.title, card.body, card.notes, card.image, card.caption].every((field) => typeof field === 'string')
      && Number.isFinite(card.minutes) && (!card.image || /^data:image\/(?:webp|png);base64,/.test(card.image)));
}

function imageFromFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Không đọc được tệp ảnh.'));
    };
    image.onload = () => {
      try {
        const scale = Math.min(1, 1040 / Math.max(image.naturalWidth, image.naturalHeight));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Trình duyệt này không xử lí được ảnh.');
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const source = canvas.toDataURL('image/webp', 0.75);
        if (source.length > 425_000) throw new Error('Ảnh còn quá lớn. Hãy dùng ảnh nhỏ hơn.');
        resolve(source);
      } catch (error) {
        reject(error);
      } finally {
        URL.revokeObjectURL(url);
      }
    };
    image.src = url;
  });
}

for (const planner of document.querySelectorAll<HTMLElement>('[data-planner]')) {
  const find = <T extends Element = HTMLElement>(name: string, root: ParentNode = planner) =>
    root.querySelector<T>(`[data-${name}]`)!;

  const lesson = find<HTMLSelectElement>('lesson');
  const modes = [...planner.querySelectorAll<HTMLInputElement>('input[name="mode"]')];
  const preview = find('preview');
  const nav = find('card-nav');
  const imageInput = find<HTMLInputElement>('image-input');
  const fileStatus = find('file-status');
  const saveStatus = find('save-status');
  const template = find<HTMLTemplateElement>('card-template');
  const presentation = find<HTMLDialogElement>('presentation');
  const previous = find<HTMLButtonElement>('previous');
  const next = find<HTMLButtonElement>('next');
  const printArea = find('print-area');
  const storagePrefix = 'bai-giang-hay:soan-bai:v1:';
  const dateFormat = new Intl.DateTimeFormat('vi-VN');

  const fields = {
    name: find<HTMLInputElement>('name'),
    date: find<HTMLInputElement>('date'),
    documentTitle: find<HTMLInputElement>('document-title'),
    materials: find<HTMLTextAreaElement>('materials'),
    cardTitle: find<HTMLInputElement>('card-title'),
    cardBody: find<HTMLTextAreaElement>('card-body'),
    cardNotes: find<HTMLTextAreaElement>('card-notes'),
    minutes: find<HTMLInputElement>('minutes'),
    caption: find<HTMLInputElement>('caption'),
  };

  let mode: Mode = 'student';
  let draft: Draft;
  let active = 0;
  let liveSlide = 0;
  let saveTimer: ReturnType<typeof setTimeout> | undefined;
  let storageKey = '';
  let pictureTask = 0;

  function value(name: keyof DOMStringMap) {
    return lesson.selectedOptions[0].dataset[name] ?? '';
  }

  function startingDraft(): Draft {
    const question = value('question');
    const activity = value('activity');
    const takeaway = value('takeaway');
    const teacher = mode === 'teacher';
    const bodies = teacher ? [
      question,
      activity + '\n\nChốt sau hoạt động. ' + takeaway,
      'Cho học sinh giải câu tự kiểm tra của bài. Yêu cầu nêu dữ kiện hoặc quan sát làm căn cứ cho câu trả lời.',
      'Giao một tình huống mới. Mỗi nhóm đề xuất cách áp dụng kết luận và nêu điều kiện cần giữ.',
    ] : [question, activity, takeaway, ''];
    const notes = teacher ? [
      'Mỗi nhóm nêu một dự đoán và lí do.',
      value('visual'),
      'Kiểm tra lời giải có dữ kiện, lập luận và đơn vị khi cần.',
      'Thu một ví dụ mới kèm phần giải thích của mỗi nhóm.',
    ] : ['', value('visual'), '', ''];
    return {
      title: value('title'),
      name: '',
      date: '',
      materials: '',
      cards: (mode === 'teacher' ? teacherStages : studentStages).map((title, index) => ({
        title,
        body: bodies[index],
        notes: notes[index],
        minutes: teacher ? stagesInMinutes[index] : 0,
        image: '',
        caption: '',
      })),
    };
  }

  function flushSave() {
    if (saveTimer !== undefined) clearTimeout(saveTimer);
    saveTimer = undefined;
    if (!draft) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(draft));
      saveStatus.textContent = 'Đã lưu trên trình duyệt này.';
    } catch {
      saveStatus.textContent = 'Trình duyệt không lưu được bản nháp. Hãy lưu PDF trước khi đóng trang.';
    }
  }

  function scheduleSave() {
    if (saveTimer !== undefined) clearTimeout(saveTimer);
    saveStatus.textContent = 'Đang lưu…';
    saveTimer = setTimeout(flushSave, 260);
  }

  function renderCard(index: number): HTMLElement {
    const card = draft.cards[index];
    const node = template.content.firstElementChild!.cloneNode(true) as HTMLElement;
    const [grade, number] = lesson.value.split('-');
    const write = (key: string, text: string) => { find(key, node).textContent = text; };
    write('output-lesson', `${draft.title || value('title')} · Lớp ${grade} · Bài ${number}`);
    write('output-stage', mode === 'teacher' ? `${card.minutes} phút` : `Slide ${index + 1}/${draft.cards.length}`);
    write('output-title', card.title.trim() || (index === 0 ? draft.title : 'Slide mới'));
    write('output-body', card.body);
    write('output-name', draft.name || `SGK trang ${value('pages')}`);
    write('output-date', draft.date ? dateFormat.format(new Date(draft.date + 'T00:00:00')) : '');
    if (card.image) {
      find('output-figure', node).hidden = false;
      const image = find<HTMLImageElement>('output-image', node);
      image.src = card.image;
      image.alt = card.caption || card.title || 'Ảnh minh họa';
      write('output-caption', card.caption);
    }
    return node;
  }

  function renderPreview() {
    preview.replaceChildren(renderCard(active));
    const minutes = draft.cards.reduce((sum, card) => sum + card.minutes, 0);
    find('preview-count').textContent = mode === 'teacher'
      ? `Hoạt động ${active + 1}/${draft.cards.length} · ${minutes} phút cả tiết`
      : `Slide ${active + 1}/${draft.cards.length}`;
    const notes = draft.cards[active].notes.trim();
    find('preview-notes').textContent = notes ? `${mode === 'teacher' ? 'Sản phẩm dự kiến' : 'Ghi chú khi nói'}\n${notes}` : '';
  }

  function cardLabel(card: Card, index: number) {
    return mode === 'teacher' ? `${index + 1}. ${card.title || 'Hoạt động'}` : `Slide ${index + 1}`;
  }

  function renderNavigation() {
    const buttons = draft.cards.map((card, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = cardLabel(card, index);
      button.setAttribute('aria-pressed', String(index === active));
      button.addEventListener('click', () => {
        active = index;
        showCard();
        nav.querySelectorAll('button')[index].focus();
      });
      return button;
    });
    nav.replaceChildren(...buttons);
  }

  function showCard() {
    pictureTask++;
    const card = draft.cards[active];
    fields.cardTitle.value = card.title;
    fields.cardBody.value = card.body;
    fields.cardNotes.value = card.notes;
    fields.minutes.value = String(card.minutes);
    fields.caption.value = card.caption;
    imageInput.value = '';
    fileStatus.textContent = '';
    find('caption-field').hidden = !card.image;
    find('remove-image').hidden = !card.image;
    find<HTMLButtonElement>('add').disabled = draft.cards.length >= maxSlides;
    find<HTMLButtonElement>('remove').disabled = draft.cards.length === 1;
    find<HTMLButtonElement>('move-earlier').disabled = active === 0;
    find<HTMLButtonElement>('move-later').disabled = active === draft.cards.length - 1;
    renderNavigation();
    renderPreview();
  }

  function loadDraft() {
    active = 0;
    storageKey = storagePrefix + lesson.value + ':' + mode;
    const initial = startingDraft();
    try {
      const saved = localStorage.getItem(storageKey);
      const parsed = saved ? JSON.parse(saved) as Draft : initial;
      draft = validDraft(parsed) ? parsed : initial;
      saveStatus.textContent = saved && draft === parsed ? 'Bản nháp đã được mở lại.' : 'Bản nháp sẽ được lưu trên trình duyệt này.';
    } catch {
      draft = initial;
      saveStatus.textContent = 'Bản nháp mới đang mở.';
    }
    fields.name.value = draft.name;
    fields.date.value = draft.date;
    fields.documentTitle.value = draft.title;
    fields.materials.value = draft.materials;

    const teacher = mode === 'teacher';
    find('editor-heading').textContent = teacher ? 'Thiết kế tiết dạy' : 'Soạn slide';
    find('name-label').textContent = teacher ? 'Giáo viên hoặc lớp' : 'Nhóm hoặc người trình bày';
    find('date-label').textContent = teacher ? 'Ngày dạy' : 'Ngày trình bày';
    find('notes-label').textContent = teacher ? 'Sản phẩm dự kiến hoặc cách kiểm tra' : 'Ghi chú khi nói';
    find('present').hidden = teacher;
    find('slide-actions').hidden = teacher;
    find('minutes-field').hidden = !teacher;
    find('materials-field').hidden = !teacher;
    find<HTMLAnchorElement>('reading-link').href = value('url');
    find<HTMLAnchorElement>('investigation-link').href = value('url') + '#thuc-hanh-truc-quan';
    for (const item of ['question', 'activity', 'takeaway', 'visual']) {
      find('prompt-' + item).textContent = value(item);
    }
    const current = new URL(location.href);
    current.searchParams.set('bai', lesson.value);
    current.searchParams.set('che-do', mode === 'teacher' ? 'giao-vien' : 'hoc-sinh');
    history.replaceState(null, '', current);
    showCard();
  }

  function edit(field: HTMLInputElement | HTMLTextAreaElement, apply: (text: string) => void) {
    field.addEventListener('input', () => {
      apply(field.value);
      renderPreview();
      scheduleSave();
    });
  }

  edit(fields.name, (text) => { draft.name = text; });
  edit(fields.date, (text) => { draft.date = text; });
  edit(fields.documentTitle, (text) => { draft.title = text; });
  edit(fields.materials, (text) => { draft.materials = text; });
  edit(fields.cardTitle, (text) => {
    const card = draft.cards[active];
    card.title = text;
    nav.querySelectorAll('button')[active].textContent = cardLabel(card, active);
  });
  edit(fields.cardBody, (text) => { draft.cards[active].body = text; });
  edit(fields.cardNotes, (text) => { draft.cards[active].notes = text; });
  edit(fields.minutes, (text) => { draft.cards[active].minutes = Math.max(0, Math.min(240, Math.round(Number(text) || 0))); });
  edit(fields.caption, (text) => { draft.cards[active].caption = text; });

  lesson.addEventListener('change', () => {
    if (saveTimer !== undefined) flushSave();
    loadDraft();
  });
  for (const toggle of modes) {
    toggle.addEventListener('change', () => {
      if (!toggle.checked) return;
      if (saveTimer !== undefined) flushSave();
      mode = toggle.value === 'teacher' ? 'teacher' : 'student';
      loadDraft();
    });
  }

  find('add').addEventListener('click', () => {
    if (draft.cards.length >= maxSlides) return;
    draft.cards.push({ title: '', body: '', notes: '', minutes: 0, image: '', caption: '' });
    active = draft.cards.length - 1;
    showCard();
    fields.cardTitle.focus();
    scheduleSave();
  });
  find('remove').addEventListener('click', () => {
    if (draft.cards.length < 2 || !window.confirm(`Xóa slide ${active + 1} khỏi bản nháp này?`)) return;
    draft.cards.splice(active, 1);
    active = Math.min(active, draft.cards.length - 1);
    showCard();
    scheduleSave();
  });
  function moveCard(step: number) {
    const destination = active + step;
    if (destination < 0 || destination >= draft.cards.length) return;
    [draft.cards[active], draft.cards[destination]] = [draft.cards[destination], draft.cards[active]];
    active = destination;
    showCard();
    scheduleSave();
  }
  find('move-earlier').addEventListener('click', () => moveCard(-1));
  find('move-later').addEventListener('click', () => moveCard(1));
  imageInput.addEventListener('change', async () => {
    const file = imageInput.files?.[0];
    if (!file) return;
    const task = ++pictureTask;
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type) || file.size > 10_000_000) {
      fileStatus.textContent = 'Chọn ảnh JPG, PNG, WebP hoặc GIF dưới 10 MB.';
      imageInput.value = '';
      return;
    }
    fileStatus.textContent = 'Đang xử lí ảnh…';
    try {
      const image = await imageFromFile(file);
      if (pictureTask !== task) return;
      draft.cards[active].image = image;
      showCard();
      fileStatus.textContent = 'Đã thêm ảnh.';
      scheduleSave();
    } catch (error) {
      if (pictureTask === task) {
        fileStatus.textContent = error instanceof Error ? error.message : 'Không đọc được ảnh.';
        imageInput.value = '';
      }
    }
  });
  find('remove-image').addEventListener('click', () => {
    draft.cards[active].image = '';
    draft.cards[active].caption = '';
    showCard();
    scheduleSave();
  });

  function updatePresentation() {
    find('presentation-slide').replaceChildren(renderCard(liveSlide));
    find('presentation-count').textContent = `${liveSlide + 1} / ${draft.cards.length}`;
    previous.disabled = liveSlide === 0;
    next.disabled = liveSlide >= draft.cards.length - 1;
  }
  function navigatePresentation(step: number) {
    liveSlide = Math.max(0, Math.min(draft.cards.length - 1, liveSlide + step));
    updatePresentation();
  }

  find('present').addEventListener('click', () => {
    liveSlide = active;
    updatePresentation();
    presentation.showModal();
  });
  previous.addEventListener('click', () => navigatePresentation(-1));
  next.addEventListener('click', () => navigatePresentation(1));
  find('close').addEventListener('click', () => presentation.close());
  presentation.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    navigatePresentation(event.key === 'ArrowLeft' ? -1 : 1);
  });

  find('print').addEventListener('click', () => {
    if (saveTimer !== undefined) flushSave();
    printArea.dataset.mode = mode;
    const contents: HTMLElement[] = [];
    if (mode === 'teacher') {
      const title = document.createElement('h1');
      title.textContent = draft.title || value('title');
      const materials = document.createElement('p');
      materials.textContent = 'Dụng cụ và học liệu. ' + (draft.materials || value('visual'));
      contents.push(title, materials);
    }
    draft.cards.forEach((card, index) => {
      const section = document.createElement('section');
      section.className = 'print-card';
      section.append(renderCard(index));
      if (mode === 'teacher' && card.notes) {
        const notes = document.createElement('p');
        notes.textContent = 'Sản phẩm dự kiến hoặc cách kiểm tra. ' + card.notes;
        section.append(notes);
      }
      contents.push(section);
    });
    printArea.replaceChildren(...contents);
    requestAnimationFrame(() => window.print());
  });

  window.addEventListener('pagehide', () => {
    if (saveTimer !== undefined) flushSave();
  });
  const parameters = new URLSearchParams(location.search);
  const selected = parameters.get('bai');
  lesson.value = [...lesson.options].some((option) => option.value === selected) ? selected! : '8-13';
  mode = parameters.get('che-do') === 'giao-vien' ? 'teacher' : 'student';
  for (const toggle of modes) toggle.checked = toggle.value === mode;
  loadDraft();
  find('setup').hidden = false;
  find('editor').hidden = false;
}
