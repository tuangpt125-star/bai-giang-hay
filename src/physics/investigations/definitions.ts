type Choice = { value: number; label: string };
export type Control = { key: string; label: string; initial: number } & (
  { options: Choice[] } | { min: number; max: number; step: number; unit: string }
);
export interface Investigation {
  model: string;
  title: string;
  task: string;
  question: string;
  controls: Control[];
  action?: string;
}

const range = (key: string, label: string, unit: string, min: number, max: number, step: number, initial: number): Control =>
  ({ key, label, unit, min, max, step, initial });
const choice = (key: string, label: string, names: string[], initial = 0): Control =>
  ({ key, label, initial, options: names.map((label, value) => ({ label, value })) });

const distance = range('distance', 'Khoảng cách', 'm', 2, 30, 2, 10);
const speed = range('speed', 'Tốc độ xe', 'm/s', 1, 10, 1, 4);
const angle = range('angle', 'Góc tới so với pháp tuyến', '°', 0, 75, 5, 30);
const voltage = range('voltage', 'Hiệu điện thế nguồn', 'V', 1.5, 6, 1.5, 3);
const switchControl = (initial = 1) => choice('closed', 'Công tắc', ['Mở', 'Đóng'], initial);
const seconds = range('seconds', 'Thời gian cấp điện', 's', 20, 120, 20, 60);
const lab = (model: string, title: string, task: string, question: string, controls: Control[], action?: string): Investigation =>
  ({ model, title, task, question, controls, action });

export const investigations: Record<string, Investigation> = {
  'toc-do-chuyen-dong': lab('speed', 'Đua hai xe trên cùng đường thử',
    'Giữ nguyên đường chạy. Dự đoán xe nào đến đích trước khi cho hai xe xuất phát cùng lúc.',
    'Với cùng quãng đường, thời gian đến đích cho biết điều gì về tốc độ?', [distance, speed, range('other', 'Tốc độ xe thứ hai', 'm/s', 1, 10, 1, 6)], 'Cho xe chạy'),
  'do-toc-do': lab('gates', 'Đo tốc độ bằng hai cổng quang',
    'Đặt hai cổng cách nhau một khoảng đã biết. Cho xe chạy, đọc thời gian giữa hai lần xe qua cổng rồi tính tốc độ.',
    'Giữ tốc độ xe, thay khoảng cách hai cổng. Thời gian đo và tốc độ tính được thay đổi ra sao?', [distance, speed], 'Cho xe qua cổng'),
  'do-thi-quang-duong-thoi-gian': lab('graph', 'Theo dõi xe và nét vẽ trên đồ thị',
    'Xe chạy 4 giây, dừng 2 giây rồi đi tiếp 4 giây. Dự đoán hình dạng đoạn giữa trước khi chạy thử.',
    'Đoạn nào nằm ngang? Đoạn nào dốc hơn nếu xe chạy nhanh hơn ở chặng cuối?', [speed, range('other', 'Tốc độ chặng cuối', 'm/s', 1, 10, 1, 6)], 'Vẽ khi xe chạy'),
  'thao-luan-ve-anh-huong-cua-toc-do-trong-an-toan-giao-thong': lab('braking', 'Thử dừng xe trước vạch',
    'Chọn tốc độ và mặt đường. So sánh hai lượt chỉ thay đổi tốc độ. Vạch cách điểm nhìn thấy vật cản 40 m.',
    'Vì sao cần giữ khoảng cách lớn hơn khi chạy nhanh hoặc đường trơn?', [choice('speed', 'Tốc độ', ['30 km/h', '45 km/h', '60 km/h'], 1), choice('surface', 'Mặt đường', ['Khô', 'Ướt'])], 'Phanh xe'),
  'song-am': lab('sound', 'Quan sát nén và dãn của không khí',
    'Cho màng loa dao động, rồi chuyển sang mô hình chân không. Theo dõi các dấu chấm biểu diễn phần tử môi trường.',
    'Vùng nén truyền đi hay mỗi phần tử chạy theo sóng đến tai?', [choice('medium', 'Môi trường', ['Không khí', 'Chân không']), range('frequency', 'Tần số minh họa', 'Hz', 200, 600, 100, 300)], 'Phát xung'),
  'do-to-va-do-cao-cua-am': lab('pitch', 'Đổi biên độ và tần số',
    'Giữ tần số, đổi biên độ. Sau đó giữ biên độ và đổi tần số. So sánh hình dạng sóng trong cùng khoảng thời gian.',
    'Thay đổi nào làm âm bổng hơn, thay đổi nào làm âm to hơn trong cùng điều kiện nghe?', [range('amplitude', 'Biên độ tương đối', '', 1, 5, 1, 2),range('frequency', 'Tần số', 'Hz', 200, 800, 100, 400)]),
  'phan-xa-am-chong-o-nhiem-tieng-on': lab('echo', 'Gửi tiếng vỗ tay tới tấm chắn',
    'Giữ khoảng cách và đổi vật liệu của tấm chắn. Theo dõi xung âm tới tấm chắn rồi quay về.',
    'Tấm rèm dày làm tiếng vang yếu hơn như thế nào?', [range('distance', 'Từ người nghe đến tấm chắn', 'm', 6, 36, 3, 18),choice('surface', 'Bề mặt', ['Tường cứng', 'Rèm dày'])], 'Phát tiếng vỗ tay'),
  'nang-luong-anh-sang-tia-sang-vung-toi': lab('shadow', 'Di chuyển vật chắn trước màn',
    'Giữ nguồn và màn cố định. Dời vật cản về phía nguồn rồi so bề rộng vùng tối. Sau đó chọn nguồn sáng rộng.',
    'Khi nào xuất hiện vùng nửa tối quanh vùng tối?', [range('distance', 'Từ nguồn đến vật', 'cm', 24, 72, 6, 42),choice('source', 'Nguồn sáng', ['Nguồn nhỏ', 'Nguồn rộng'])], 'Bật đèn'),
  'su-phan-xa-anh-sang': lab('reflection', 'Chiếu tia và đo so với pháp tuyến',
    'Đổi góc tới, rồi quan sát số đo của tia phản xạ. Thử lúc tia chiếu theo pháp tuyến.',
    'Góc tới và góc phản xạ liên hệ thế nào?', [angle], 'Chiếu tia'),
  'anh-cua-vat-qua-guong-phang': lab('mirror', 'Đặt vật trước gương',
    'Dời vật xa gương hơn, rồi thử thay đổi chiều cao vật. So vị trí và chiều cao ảnh.',
    'Nếu dời vật xa gương 10 cm thì khoảng cách giữa vật và ảnh thay đổi bao nhiêu?', [range('distance','Từ vật tới gương','cm',10,40,5,20),range('height','Chiều cao vật','cm',4,16,2,10)], 'Dựng ảnh'),
  'nam-cham': lab('magnet', 'Đưa mẫu lại gần cực Bắc',
    'Thử từng mẫu với cùng nam châm. So hai cực N, S và một vật bằng sắt.',
    'Mẫu nào bị hút, mẫu nào bị đẩy và mẫu nào hầu như không đổi vị trí?', [choice('sample','Mẫu thử',['Cực Bắc (N)','Cực Nam (S)','Sắt','Nhôm','Gỗ'])], 'Đưa đến gần'),
  'tu-truong': lab('compass', 'Đặt la bàn quanh thanh nam châm',
    'Đặt la bàn ở đầu Bắc, đầu Nam và phía trên thanh. Quan sát đầu Bắc của kim sau khi kim ổn định.',
    'Kim có luôn hướng thẳng về cực Nam của nam châm không?', [choice('place','Vị trí la bàn',['Gần đầu Bắc','Phía trên giữa thanh','Gần đầu Nam','Phía trên lệch về đầu Bắc'])], 'Đặt la bàn'),
  'che-tao-nam-cham-dien-don-gian': lab('coil', 'Đóng mạch và thử nhấc kẹp giấy',
    'Giữ cùng một nguồn rồi so ít vòng dây với nhiều vòng dây. Mở công tắc để thử lại.',
    'Nam châm điện thuận tiện thế nào khi cần thả vật sắt xuống?', [range('turns','Số vòng dây','vòng',10,50,10,20),switchControl()], 'Thử hút kẹp giấy'),
  'khoi-luong-rieng': lab('density', 'Đặt mẫu lên cân',
    'Cân hai mẫu cùng chất với thể tích khác nhau. Sau đó giữ nguyên thể tích và đổi chất. So sánh tỉ số m/V.',
    'Với cùng một chất, tỉ số m/V thay đổi thế nào khi lấy mẫu lớn hơn?', [choice('material','Chất của mẫu',['Sắt','Nhôm','Đồng']),range('volume','Thể tích mẫu','cm³',10,40,10,20)], 'Cân mẫu'),
  'thuc-hanh-xac-dinh-khoi-luong-rieng': lab('densitypractice', 'Chọn phép đo thể tích phù hợp',
    'Chọn mẫu gỗ, nước hoặc sỏi. Quan sát dụng cụ rồi đọc các số đo cần để xác định thể tích và khối lượng.',
    'Vì sao cần trừ hai số chỉ khi dùng bình chia độ để đo thể tích viên sỏi?', [choice('sample','Mẫu',['Khối gỗ hình hộp','Nước trong bình','Viên sỏi']),range('level','Mực nước ban đầu khi thử sỏi','mL',30,50,5,35)], 'Tiến hành đo'),
  'tac-dung-lam-quay-cua-luc-moment-luc': lab('weights', 'Treo quả nặng tại A, B, O, C',
    'Thử một quả tại A, O và C. Sau đó làm ba lượt của Bảng 18.1. Chạm lỗ trên hình để thêm quả. Lỗ đã có hai quả sẽ trở về 0 khi chạm tiếp.',
    'Khi nào thanh giữ ngang? Lượt nào cho thấy thay đổi số quả, lượt nào cho thấy đổi vị trí treo?', ['A','B','O','C'].map(key=>range(key,'Số quả tại '+key,'quả',0,2,1,0)), 'Thả thanh'),
  'don-bay-va-ung-dung': lab('scale', 'Đổi lỗ móc và đọc lực kế',
    'Giữ tải 18 N ở phía trái, cách O 20 cm. Chọn hoặc chạm một lỗ bên phải để móc lực kế. Thử ba vị trí và ghi từng số chỉ.',
    'Trong ba vị trí, móc lực kế ở đâu để chỉ cần lực nhỏ nhất?', [range('arm','Lỗ móc cách O','cm',20,60,20,20)], 'Kéo đến cân bằng'),
  'hien-tuong-nhiem-dien-do-co-xat': lab('static', 'Thử hai vật sau khi cọ xát',
    'Một đầu mang điện âm sau khi cọ xát. Đổi mẫu thứ hai và đưa lại gần. Mẩu giấy trung hòa vẫn có thể bị hút.',
    'Mẫu nào bị đẩy? Vì sao vật trung hòa không nhất thiết đứng yên?', [choice('sample','Mẫu thứ hai',['Mang điện âm','Mang điện dương','Mẩu giấy trung hòa'])], 'Đưa đến gần'),
  'dong-dien-nguon-dien': lab('conductors', 'Thay vật trong mạch thử',
    'Đặt từng mẫu vào khe giữa hai kẹp của mạch dùng pin. Đóng công tắc rồi quan sát bóng.',
    'Kết quả thử phụ thuộc thế nào vào vật nối giữa hai kẹp?', [choice('sample','Mẫu nối',['Đồng','Nhôm','Nhựa','Gỗ khô']),switchControl()], 'Thử mạch'),
  'mach-dien-don-gian': lab('circuit','Nối nguồn, công tắc và đèn',
    'Nối đoạn dây còn thiếu và thử cả hai vị trí của công tắc. Theo dõi chiều dòng điện quy ước khi mạch kín.',
    'Đèn có thể sáng nếu chỉ một trong hai chỗ ngắt được nối kín không?', [choice('wire','Đoạn dây còn thiếu',['Chưa nối','Đã nối']),switchControl(0)], 'Chạy thử mạch'),
  'tac-dung-cua-dong-dien': lab('effects','Thử dòng điện qua ba thiết bị',
    'Đổi thiết bị và thử đóng hoặc mở mạch. Theo dõi dấu hiệu khi dòng điện đi qua.',
    'Dấu hiệu nào cho biết tác dụng chính trong mỗi trường hợp?', [choice('sample','Thiết bị',['Dây nung','Bóng đèn','Bình mạ đồng']),switchControl()], 'Quan sát thiết bị'),
  'cuong-do-dong-dien-va-hieu-dien-the': lab('meters','Mắc ampe kế và vôn kế',
    'Chọn cách mắc dụng cụ, dự đoán sẽ đọc được đại lượng gì rồi đo. Mô hình dùng một tải có điện trở cố định.',
    'Vì sao phải mắc ampe kế nối tiếp và vôn kế song song với bộ phận cần đo?', [choice('meter','Cách mắc',['A nối tiếp, V song song','A mắc ngang hai đầu tải','V mắc nối tiếp']),voltage], 'Kiểm tra cách mắc'),
  'thuc-hanh-do-cuong-do-dong-dien-va-hieu-dien-the': lab('meterlab','Đo khi đổi nguồn điện',
    'Chọn điện áp nguồn, kiểm tra cực của dụng cụ và ghi ít nhất hai lượt đo. Tải trong mô hình là điện trở cố định.',
    'Sau khi giữ nguyên tải và đổi hiệu điện thế, hai số chỉ thay đổi ra sao?', [voltage,choice('polarity','Cực của dụng cụ',['Nối đúng cực','Đảo cực ampe kế'])], 'Đọc đồng hồ'),
  'nang-luong-nhiet-va-noi-nang': lab('particles','Quan sát chuyển động nhiệt',
    'So hai mức nhiệt độ của cùng chất. Theo dõi đường đi của các hạt đánh dấu trong mô hình.',
    'Khi nhiệt độ tăng, tốc độ chuyển động của các hạt thay đổi thế nào?', [range('temp','Nhiệt độ','°C',20,80,10,30)], 'Quan sát hạt'),
  'su-truyen-nhiet': lab('heat','So sánh ba cách truyền nhiệt',
    'Chọn thanh rắn, bình nước hoặc khoảng trống có nguồn bức xạ. Theo dõi đường truyền năng lượng khi bật nguồn.',
    'Trong trường hợp nào có dòng chất chuyển động? Trường hợp nào truyền qua cả khoảng trống?', [choice('mode','Bố trí',['Nung một đầu thanh','Đun nước từ dưới','Chiếu bức xạ']),choice('power','Nguồn nhiệt',['Tắt','Bật'],1)], 'Theo dõi nhiệt'),
  'su-no-vi-nhiet': lab('expansion','Hơ nóng thanh, chất lỏng và không khí',
    'Đổi mẫu trong khi giữ nguyên mức gia nhiệt. Nhìn vạch ban đầu và quan sát độ thay đổi kích thước hoặc thể tích.',
    'Vì sao cần chừa khe hở ở hai đầu một thanh cầu?', [choice('sample','Mẫu thử',['Thanh kim loại','Chất lỏng trong ống','Không khí trong xi lanh']),range('temp','Nhiệt độ sau khi hơ','°C',20,80,10,60)], 'Hơ nóng'),
  'thuc-hanh-do-nang-luong-nhiet-bang-joulemeter': lab('joule','Đo điện năng cấp cho nước',
    'Giữ công suất bộ đun, đổi thời gian và khối lượng nước. Đọc joulemeter và nhiệt kế rồi ghi kết quả.',
    'Cùng một điện năng cấp vào, vì sao ít nước nóng lên nhiều hơn?', [seconds,range('mass','Khối lượng nước','g',100,300,50,150)], 'Bật bộ đun'),
};

export function controlValue(control: Control, value: number) {
  return 'options' in control
    ? control.options.find(option => option.value === value)?.label ?? ''
    : [value.toLocaleString('vi-VN'), control.unit].filter(Boolean).join(' ');
}
