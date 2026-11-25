# Bài Giảng Hay

Website tự học Vật lí lớp 8 theo các chương III–VI của sách *Khoa học tự nhiên 8 – Kết nối tri thức với cuộc sống*.

## Chạy trên máy

Cần Node.js 22.12 trở lên.

```sh
npm ci
npm run dev
npm run build
```

Astro xuất website tĩnh vào `dist/`.

## Cấu trúc nội dung

```text
content/ket-noi-tri-thuc/lop-08/khoa-hoc-tu-nhien/
├── book.json
└── bai-hoc/
src/
├── content.config.ts
├── layouts/
└── pages/
```

`book.json` lưu các chương, thứ tự bài, slug và khoảng trang in. `readerPageOffset` quy đổi số trang in sang số trang của trình đọc trực tuyến. Khi có tệp `bai-hoc/<slug>.mdx`, trang bài sẽ hiện bản đọc HTML. Tệp MDX cần có trường `title` trong frontmatter. Các bài còn lại dẫn đến đúng trang trong sách gốc.

Bản xem thử riêng tư có nội dung nguyên văn của bài mẫu. Nhánh GitHub công khai chứa giao diện, cấu hình và mục lục.

[Nguồn đối chiếu mục lục](https://online.pubhtml5.com/ngvcn/wlly/#p=5)
