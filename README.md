# Bài Giảng Hay

Website tự học Vật lí lớp 7 và 8 theo các chương III–VI của bộ sách *Kết nối tri thức với cuộc sống*.

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
content/ket-noi-tri-thuc/lop-{07,08}/khoa-hoc-tu-nhien/
├── book.json
└── bai-hoc/
src/
├── content.config.ts
├── layouts/
└── pages/
```

`book.json` lưu các chương, thứ tự bài, slug và khoảng trang in. Khi có tệp `bai-hoc/<slug>.mdx`, trang bài sẽ hiện bản đọc HTML. Tệp MDX cần có trường `title` trong frontmatter. Hình, công thức và bảng của bài được đặt trực tiếp trong nội dung. Các bài chưa có MDX hiển thị trạng thái chuẩn bị.

Bản xem riêng tư chứa các bài đọc HTML cùng hình và bảng trong bài. Repo GitHub công khai chứa giao diện, cấu hình và mục lục.

[Nguồn mục lục lớp 7](https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/shs-khoa-hoc-tu-nhien.4492017677) · [Nguồn mục lục lớp 8](https://online.pubhtml5.com/ngvcn/wlly/#p=5)
