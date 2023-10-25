# Hướng dẫn sử dụng project WEBLOCAL

## I. Tổng quan

<b>WEBLOCAL</b> là một sản phầm chứa rất nhiều công sức của các thành viên team Embedded, vì vậy sử dụng nó như nào cho tối ưu hiệu quả cũng như thành thạo thì hãy dành chút thời gian để đọc qua những dòng hướng dẫn này nhé.

***Lưu ý:*** Đối với project <b>linksafe_ubus</b>, các thao tác vẫn còn có thể sử dụng, điểm khác biệt sẽ có ghi chú.

## II. Hướng dẫn cài đặt

Đầu tiên để chạy được project thì phải có thư mục cài ở trên máy với việc mở terminal lên và chạy lệnh (sau sẽ sửa lại thư mục)

```
 http://192.168.1.100/Embedded/web-local-smr.git
```
sau đó `cd LocalWeb/`, trong thư mục này sẽ có các thao tác cơ bản như sau

### Đối với lần đầu clone project

* Chạy lệnh
```
npm install
```
hoặc 
```
npm install -f
```
để bỏ qua warning và cài đặt các thư viện cần thiết.
* Sau khi chạy lệnh trên thành công, chạy lệnh sau để run project
```
npm run start
```
* Khi đó kết quả sẽ hiển thị thành công và địa chỉ để truy cập, thông thường sẽ là [http://localhost:3000](http://localhost:3000)
* Muốn dừng việc chạy project, hãy bấm `Ctrl + C`

### Đối với các lần tiếp theo

* Các lần tiếp theo thì chỉ cần chạy 
```
npm run start
```
và chỉ cần chạy lại lệnh `npm install -f` trong trường hợp cài thêm thư viện vào project.

### Build Project

* Trong trường hợp muốn build project, hãy dừng project lại trong trường hợp project đang chạy sau đó chạy lệnh 
```
npm run build
```
* Khi đó project sẽ báo success và tạo ra thư mục `build`

### Copy vào board

* Thư mục build ở trên sẽ là thư mục được cop vào con board để chạy.
* Để board chạy được phần weblocal thì phải copy toàn bộ thư mục trong folder `build` vào `/www` trong board, còn với project linksafe_ubus thì copy file `linksafe` vào thư mục `/usr/libexec/rpcd`. Ví dụ đối với project <b>WEBLOCAL</b>
```
lancs@weblocal:~/LocalWeb/build$ scp -r * root@172.168.1.132:/www
```
* Sau đó, để board nhận dạng được web mới thì phải vào trong con board và chạy lệnh:
```
service uhttpd restart
```
* Kiểm tra lại web local xem có sự thay đổi chưa.

* Ví dụ đối với project <b>linksafe_ubus</b>
```
lancs@weblocal:~/linksafe_ubus$ scp -r linksafe root@172.168.1.132:/usr/libexec/rpcd/
```

### Thao tác với git 
* Ngoài việc thao tác với project, nên thông thạo các thao tác cơ bản với git để công việc quản lí trở nên dễ dàng hơn.
* Đối với việc update code lên git cần chú ý một số điều sau:
    * Trong trường hợp đã thay đổi code và muốn update code lên git, cần check xem bản của mình có phải là bản mới nhất ko để tránh việc bị conflict với người khác, điều này là rất cần thiết, cách check là chạy lệnh `git pull` (nên thường xuyên chạy lệnh này). Đối với phần code mới của mình, muốn update thì cần chạy `git add + (tên file hoặc folder)` hoặc `git add .` để thêm toàn bộ file và folder vào danh sách update. Sau đó chạy `git commit` để tới giao diện commit, tại đây sẽ hiển thị lên toàn bộ những thay đổi của bạn đối với project, hãy bỏ comment `#` ở những nơi cần thiết để hiển thị và save nó lại hoặc nhanh hơn, có thể chạy lệnh `git commit -m "abc"` với `abc` là lời comment của bạn để commit toàn bộ thay đổi mà ko cần soát lại. Cuối cùng , chạy `git push` để add lên git, kết quả trả về mà ko báo lỗi thì coi như thành công. Để chắc chắn hãy lên git để xem lại các thay đổi của mình.
    * Đối với trường hợp đã thay đổi và xảy ra tình trạng conflict với update của người khác, cần phải xem thật cẩn thận lại những thay đổi bị conflict và trao đổi thật kĩ với người update trước đó. Trong trường hợp xấu nhất, hay chạy `git reset` để bỏ đi thay đổi của mình để tránh hiện tượng conflict, tuy nhiên hành động này sẽ xóa đi toàn bộ thay đổi nên cần cẩn trọng trong bước này.

## III. Lời cuối

Trên đây là toàn bộ các thao tác cơ bản với project, hi vọng mọi người sẽ xem qua, hiểu hơn về cách sử dụng project và đóng góp ý kiến. Xin cảm ơn.
