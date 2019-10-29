# Banana Project Management API Repo

## Môi trường yêu cầu

- Nodejs v8.11.4 hoặc mới hơn.
- MariaDB v10.1 hoặc mới hơn.

## Cài đặt

- Clone source từ Github, có thể dùng https hoặc ssh tùy sở thích.
- Tạo file `.env` bằng cách copy file `.env.example` sửa tên file thành `.env`. Đây là file chứa các biến môi trường để chạy source
- Sửa các giá trị trong file `.env` phù hợp với config máy
- Sau đó `npm install` hoặc`yarn`
- Tạo database với tên là `banana-project-management`và charset là `utf8-general-ci`
- `npm start` hoặc `npm run dev` để chạy server

## Nhắc nhở nhỏ về Git

1. Cập nhật source code trên local sao cho mới nhất tại branch chính, hiện tại là `develop`.

```Git command
git checkout develop
git pull
```
2. Tạo branch mới từ branch chính, chú ý là phải từ branch chính, ko tạo từ branch khác ngoài branch chính (develop)
    - Note: Rule đặt tên branch:
        - Feature mới: `feature/task/update` or `feature/task/listTaskOfProject`
        - Fix bug: `fixbug/task/update` or `fixbug/task/listTaskOfProject`

```Git command
git checkout -b new_feature_name
```

3. Phát triển phần source code theo feature của mình.

4. Test lại phần source code đã test bằng tool.

5. Add những file đã thay đổi và commit.

```Git command
git add .
git commit -m "Develop update student function feature"
```

6. Đẩy source code mới nhất lên tại branch mới

```Git command
git push -u origin new_feature_name
```

7. Lên trên github.com, vào repository của mình, vào branch mới của mình, click vào `compare and pull request`.

8. Sau khi kiểm tra đã đúng, click vào `Create new pull request`.

9. Copy link pull request bỏ vào task trên **trello** & thông báo lên group để review cái pull request này, đồng thời source code nên check out về lại branch chính.

```Git command
git checkout develop
```

