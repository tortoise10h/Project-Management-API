
/* eslint-disable */
const axios = require('axios');
const _ = require('lodash');
const constants = require('../../common/lib/constant');
const uuid = require('uuid')
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const courses = [
    [
        {
            name: 'Đánh Thức Tư Duy Dịch Vụ Khách Hàng',
            detail: `Tăng doanh thu bằng 8 nguyên tắc thuyết phục khách hàng, đúc kết từ những phương pháp bán hàng kinh điển của các tập đoàn hàng đầu trên thế giới
            Phương pháp đọc vị những hành động, cử chỉ của người đối diện, từ đó phán đoán tâm tư, suy nghĩ của họ
            Kỹ thuật xử lý những câu hỏi khó và phàn nàn từ khách hàng, giúp tạo dựng mối quan hệ lâu bền`
        }, {
            name: 'Bí Quyết Chốt Sales Và Tăng Doanh Số',
            detail: `Tăng doanh thu bằng 8 nguyên tắc thuyết phục khách hàng, đúc kết từ những phương pháp bán hàng kinh điển của các tập đoàn hàng đầu trên thế giới
            Phương pháp đọc vị những hành động, cử chỉ của người đối diện, từ đó phán đoán tâm tư, suy nghĩ của họ
            Kỹ thuật xử lý những câu hỏi khó và phàn nàn từ khách hàng, giúp tạo dựng mối quan hệ lâu bền`
        }, {
            name: 'Bí Quyết Bán Hàng Và Marketing 4.0',
            detail: `Nắm bắt phương thức ứng dụng Marketing trong bán hàng 4.0 hiện nay
            Hiểu rõ quy trình bán hàng và cách xử lý khi bị từ chối trong bán hàng
            Sở hữu bí quyết kết thúc một thương vụ bán hàng thành công`
        },
        {
            name: `Telesales - Bán Hàng Qua Điện Thoại Chuyên Nghiệp`,
            detail: `Nắm vững chiến lược bán hàng qua điện thoại
            Nghệ thuật để khách hàng không nói lời từ chối
            Thông thạo các kịch bản đặt hẹn và chốt sales`
        },
        {
            name: `Thấu Hiểu Khách Hàng Bằng Phương Pháp Nghiên Cứu Từ A - Z`,
            detail: `Hiểu rõ các khái niệm của khuyến mại trong Marketing
            Lập kế hoạch khuyến mại Marketing hài hòa giữa chiến lược sản phẩm, chiến lược giá và khuyến mại
            Sở hữu 52 chiến thuật khuyến mại hiệu quả`
        },
        {
            name: `Xây Dựng Chiến Lược Và Kế Hoạch Khuyến Mại`,
            detail: `Hiểu rõ các khái niệm của khuyến mại trong Marketing
            Lập kế hoạch khuyến mại Marketing hài hòa giữa chiến lược sản phẩm, chiến lược giá và khuyến mại
            Sở hữu 52 chiến thuật khuyến mại hiệu quả`
        },
        {
            name: `Bí Quyết Xây Dựng Mối Quan Hệ Trong Kinh Doanh`,
            detail: `Thành thạo nghệ thuật cho và nhận trong tạo dựng mối quan hệ
            Cách xây dựng mối quan hệ qua mạng xã hội
            Nắm vững các bí quyết để có thể tạo dựng mối quan hệ tốt với bất kỳ ai`
        },
        {
            name: `Thoát Khỏi Ác Mộng Ép Doanh Số Với Công Thức Bán Hàng 3s Đỉnh Cao`,
            detail: `6 kỹ năng giúp xây dựng mối quan hệ với khách hàng
            Kiến thức về phương pháp bán hàng hợp lý
            Phương pháp nhận diện khách hàng tiềm năng`
        },
        {
            name: `Kỹ Năng Bán Hàng Chuyên Nghiệp`,
            detail: `Cách lập kế hoạch bán hàng rõ ràng, cụ thể và lên cuộc hẹn thành công
            Thấu hiểu tâm lý từng dạng khách hàng, biết cách ứng xử phù hợp với từng dạng khách hàng để đạt hiệu quả tối ưu
            Làm chủ cuộc nói chuyện với khách hàng chuyên nghiệp, hiệu quả, tạo niềm tin và xây dựng mối quan hệ lâu dài`
        },
        {
            name: `Khởi Nghiệp Và Bán Hàng Trên Internet`,
            detail: `Nắm vững các nguyên tắc xương máu khi khởi nghiệp
            Tường tận các công cụ bán hàng trực tuyến tốt nhất cho người mới khởi nghiệp
            Biết cách bảo toàn đồng vốn của mình`
        },
        {
            name: `Bí Mật Kinh Doanh Online Tuyệt Đỉnh`,
            detail: `Xây dựng tâm thế khởi nghiệp
            Tạo động cơ khởi nghiệp
            Tích lũy những kỹ năng cốt yếu để khởi nghiệp thành công`
        },
        {
            name: `Bí Mật Định Vị Và Phát Triển Thương Hiệu Bền Vững`,
            detail: `Biết cách định vị phân khúc thị trường phù hợp với định hướng kinh doanh
            Xác định đúng tệp khách hàng mục tiêu
            Nắm phương pháp xây dựng thương hiệu sản phẩm một cách chuyên nghiệp`
        },
    ],
    [
        {
            name: `Cải Thiện Tự Tin, Nâng Tầm Ảnh Hưởng`,
            detail: `Giúp bạn hiểu được các phương pháp để phát triển nhân viên và thoát khỏi các tình huống làm cho người quản lý kiệt sức
            Sở hữu phương pháp tiến hành các buổi trao đổi huấn luyện hiệu quả
            Kiến thức thực tế khi huấn luyện nhân viên mà chưa sách vở nào đề cập`
        }, {
            name: `Phương Pháp Huấn Luyện Nâng Cao Hiệu Suất Nhân Viên`,
            detail: `Giúp bạn hiểu được các phương pháp để phát triển nhân viên và thoát khỏi các tình huống làm cho người quản lý kiệt sức
            Sở hữu phương pháp tiến hành các buổi trao đổi huấn luyện hiệu quả
            Kiến thức thực tế khi huấn luyện nhân viên mà chưa sách vở nào đề cập
            `
        }, {
            name: `Phong Cách Chuyên Nghiệp`,
            detail: `Nhìn nhận đột phá về khái niệm “chuyên nghiệp”
            Khám phá 3 yếu tố về bản thân làm nên sự chuyên nghiệp
            Tăng sức thuyết phục và ảnh hưởng của bạn trong công việc
            `
        }, {
            name: `Tìm Hiểu Các Nhóm Tính Cách Theo Mô Hình DISC`,
            detail: `Khám phá tổng quan mô hình DISC nhằm thấu hiểu sự đa dạng trong tính cách con người
            Tạo dựng và củng cố các mối quan hệ bền vững
            Ứng dụng kỹ năng giao tiếp hiệu quả trong tuyển dụng và kinh doanh`
        }, {
            name: `Bí Quyết Nâng Cao Khả Năng Ghi Nhớ - Cho Người Đi Làm`,
            detail: `Khám phá những nguyên tắc cơ bản nhưng ít ai biết trong giao tiếp
            Tập hợp những dẫn chứng thực tiễn từ cuộc sống
            Hiểu được nghệ thuật kết nối với người khác để thành công trong sự nghiệp`
        }, {
            name: `Bí Quyết Giao Tiếp Để Thành Công`,
            detail: `Khám phá những nguyên tắc cơ bản nhưng ít ai biết trong giao tiếp
            Tập hợp những dẫn chứng thực tiễn từ cuộc sống
            Hiểu được nghệ thuật kết nối với người khác để thành công trong sự nghiệp`
        }, {
            name: `Thành Thạo Microsoft Word 2013: Từ Cơ Bản Đến Nâng Cao`,
            detail: `Sử dụng thành thạo các tính năng của Microsoft Word 2013
            Nắm các thủ thuật giúp soạn thảo nhanh văn bản
            Thực hành biên soạn các tài liệu ứng dụng thực tế trong doanh nghiệp`
        }, {
            name: `Trọn Bộ Kỹ Năng Văn Phòng Thời Kỳ 4.0 - Phiên bản nâng cao`,
            detail: `Kiến thức nâng cao về Powerpoint và Excel
            Hướng dẫn chi tiết cách thiết kế đồ họa thông tin
            Tìm hiểu sơ lược về Adobe Premiere
            `
        }, {
            name: `Làm Chủ Excel Trong 6 Giờ`,
            detail: `Thành thạo các thao tác, các hàm, câu lệnh nâng cao trong Excel
            Áp dụng được ngay các kiến thức đã học vào công việc tổng hợp, phân tích và xử lý dữ liệu
            Nắm được các thủ thuật Excel giúp nâng cao năng suất và hiệu quả công việc`
        }, {
            name: `Kỹ Năng Phản Biện Và Thuyết Phục`,
            detail: `Nắm phương pháp thuyết phục nhiều đối tượng khác nhau
            Trở thành người "có sức ảnh hưởng"
            Giúp những lời đề nghị của bạn dễ được người khác chấp nhận hơn`
        }, {
            name: `Xác Định Nghề Nghiệp Tương Lai Thông Qua Chuỗi Test MBTI, Test HOLLAND Và Test Khí Chất`,
            detail: `Khám phá và mở rộng giới hạn bản thân
            Thấu hiểu đặc điểm, thế mạnh và những hạn chế của chính mình để làm chủ vận mệnh
            Khai thác tiềm năng bản thân để phát triển vượt bậc`
        }, {
            name: `Kỹ Năng Giải Mã Ngôn Ngữ Cơ Thể Và Nắm Bắt Tâm Lý Người Khác`,
            detail: `Thấu hiểu tâm lý đối phương bằng ngôn ngữ cơ thể, làm chủ trong giao tiếp
            Sở hữu bí quyết sử dụng ngôn ngữ cơ thể để nâng tầm ảnh hưởng
            Giao tiếp hàng ngày trở nên hiệu quả hơn, từ đó tạo dựng các mối quan hệ tốt đẹp trong sự nghiệp và cuộc sống`
        }
    ],
    [
        {
            name: `Trọn Bộ Kiến Thức – Kinh Nghiệm Digital Marketing Đa Kênh 4.0`,
            detail: `Thành thạo các công cụ hỗ trợ quảng cáo Facebook
            Sáng tạo trong việc xây dựng hình ảnh, nội dung thu hút, có tính tương tác cao
            Áp dụng ngay các thủ thuật Facebook Ads ngay trong quá trình học
            `
        }, {
            name: `Facebook Marketing Từ A - Z`,
            detail: `Thành thạo các công cụ hỗ trợ quảng cáo Facebook
            Sáng tạo trong việc xây dựng hình ảnh, nội dung thu hút, có tính tương tác cao
            Áp dụng ngay các thủ thuật Facebook Ads ngay trong quá trình học`
        }, {
            name: `Google Adwords Cơ Bản`,
            detail: `Am hiểu phương thức bán hàng, tăng doanh thu bền vững từ Google Adwords
            Sáng tạo nội dung, hình ảnh, đa dạng hình thức chạy quảng cáo
            Nắm vững nền tảng kiến thức - quy trình - thủ thuật chạy quảng cáo Google Adwords`
        }, {
            name: `Facebook Marketing Toàn Diện 2018`,
            detail: `Thành thạo cách tối ưu quảng cáo Facebook
            Tư duy để tạo sự khác biệt trong kinh doanh
            Tăng tỉ lệ chốt đơn hàng, gia tăng doanh số bán hàng vượt trội
            `
        }, {
            name: `Giải Mã 72 Công Thức Bí Mật Quảng Cáo Google Ads`,
            detail: `Am hiểu kiến thức chuyên sâu về nguyên tắc hoạt động của Google Ads
            Nắm rõ các bước tạo quảng cáo tạo hiệu quả cao, giảm chi phí, nâng cao chất lượng
            Khoá học đầu tiên và duy nhất chia sẻ cách chống click tặc cho ngành cạnh tranh cao`
        }, {
            name: `Bí Quyết Tăng Doanh Số Bằng Email Marketing`,
            detail: `Cung cấp những kiến thức căn bản và khái quát về Email Marketing
            Triển khai Email Marketing một cáchhiệu quả và chính xác
            Cách sử dụng phần mềm Mailchimp - công cụ Email Marketing hàng đầu hiện nay`
        }, {
            name: `Bùng Nổ Doanh Số Cùng Google Shopping 2019`,
            detail: `Cung cấp những kiến thức căn bản, tối ưu và dễ nhớ nhất về Google Shopping
            Cách thức triển khai Google Shopping chính xác
            Tự ứng dụng và kết hợp với những công cụ khác để xây dựng chiến lược marketing hiệu quả, bùng nổ doanh số`
        }, {
            name: `Xây Dựng Thương Hiệu Cá Nhân Trên Internet    `,
            detail: `Kiến thức toàn diện về thương hiệu cá nhân và xây dựng thương hiệu cá nhân
            Áp dụng vào thực tiễn, xây dựng được một thương hiệu cá nhân hoặc sản phẩm nổi bật trên mạng xã hội
            Tăng doanh thu bán hàng từ thương hiệu cá nhân, tạo niềm tin và uy tín cho thị trường và khách hàng`
        }, {
            name: `Xây Dựng Hệ Thống Marketing Và Bán Hàng Tự Động Trên Facebook`,
            detail: `Thành thạo công cụ của hệ thống Automation Facebook Marketing (FEBE, Chatbot,..)
            Nội dung gần gũi, dễ hiểu, cung cấp các kiến thức cần thiết giúp xây dựng một hệ thống tự động hỗ trợ hiệu quả cho việc kinh doanh
            Áp dụng Automation Facebook Marketing giúp giảm chi phí nhân sự, quản lý và tăng lợi nhuận`
        }, {
            name: `Trọn Bộ Bí Kíp Về Google Ads Marketing`,
            detail: `Thành thạo công cụ của hệ thống Automation Facebook Marketing (FEBE, Chatbot,..)
            Nội dung gần gũi, dễ hiểu, cung cấp các kiến thức cần thiết giúp xây dựng một hệ thống tự động hỗ trợ hiệu quả cho việc kinh doanh
            Áp dụng Automation Facebook Marketing giúp giảm chi phí nhân sự, quản lý và tăng lợi nhuận`
        }, {
            name: `Facebook Smart Marketing A-Z`,
            detail: `Cập nhật các tính năng mới được cập nhật của Facebook
            Cách để tạo nên một quảng cáo thu hút và ấn tượng
            Cung cấp kiến thức tổng quan về chạy quảng cáo trên Facebook
            `
        }, {
            name: `Viết Sao Để Thuyết Phục Người Khác Muốn Đọc`,
            detail: `Phát triển tư duy như một chuyên gia Copywriting
            Được chia sẻ mẹo viết bài thuyết phục
            Tự tạo được nội dung quảng cáo hiệu quả, tương tác độc giả`
        },
    ],
    [
        {
            name: `Học Tất Tần Tật Về Javascript Từ Đầu`,
            detail: `Cơ hội trải nghiệm và áp dụng vào 10 dự án thực tế được chọn lọc
            Biết cách tạo hiệu ứng đẹp cho website
            Biết cách thiết kế web tương thích trên thiết bị di động, Ipad, Iphone chuẩn responsive`
        }, {
            name: `Lập Trình Frontend Từ Cơ Bản: Bootstrap 4, jQuery, CSS3, HTML5`,
            detail: `Cơ hội trải nghiệm và áp dụng vào 10 dự án thực tế được chọn lọc
            Biết cách tạo hiệu ứng đẹp cho website
            Biết cách thiết kế web tương thích trên thiết bị di động, Ipad, Iphone chuẩn responsive`
        }, {
            name: `Học Lập Trình ReactJS Và Redux Từ Đầu, Tạo Ứng Dụng Fullstack Với Node.js và ReactJS`,
            detail: `Nắm được kiến thức bài bản từ đầu về thư viện Javascript nổi tiếng phát triển bởi Facebook - React JS
            Thiết kế những trang web dựa trên nền tảng React một cách chuyên nghiệp nhất
            Từng bước tự tin ứng tuyển vào các công ty lập trình React`
        }, {
            name: `Lập Trình C# Cơ Bản`,
            detail: `ó kiến thức toàn diện về ngôn ngữ lập trình C#
            Có khả năng phát triển phần mềm tương tác
            Là cơ sở để lập trình di động đa nền tảng với Xamarin
            `
        }, {
            name: `Lập Trình Backend Cho Website Bằng PHP/Mysql Theo Mô Hình MVC`,
            detail: `Hiểu rõ các kiến thức, công cụ mới trong lập trình hiện đại
            Thành thạo phương pháp lập trình PHP nâng cao theo mô hình MVC
            Làm ứng dụng web với PHP hoàn chỉnh từ A - Z thông qua hơn 10 ứng dụng thực tế
            `
        }, {
            name: `Lập Trình Fullstack Với Angular - MySQL`,
            detail: `Ứng dụng AngularJS cho việc lập trình các ứng dụng web đơn lẻ
            Tự thiết kế và phát triển chức năng cho phần mềm web-apiURLd bằng AngularJS
            Thấu hiểu logic của các ngôn ngữ JS
            `
        }, {
            name: `Làm Website Dành Cho Người Không Biết Lập Trình`,
            detail: `Chương trình đặc biệt phù hợp cho người muốn làm website mà không cần biết đến lập trình
            Làm chủ việc xây dựng và vận hành website giúp bạn luôn chủ động trong công việc truyền thông online trên website và tiết kiệm chi phí
            Chương trình được xây dựng từ việc làm website thực tế. Bạn sẽ được hướng dẫn với cách làm thực tế chứ không phải từ một dự án demo`
        }, {
            name: `Luyện Thi Lấy Chứng Chỉ Quốc Tế ISTQB Foundation Cho Tester`,
            detail: `Cung cấp đầy đủ kiến thức để tham gia lấy chứng chỉ ISTQB foundation
            Trang bị toàn bộ kỹ năng, kiến thức cơ bản để bắt đầu công việc của một Tester
            Nâng cao được kỹ năng test, kỹ thuật thiết kế test case, lập kế hoạch test, lập báo cáo test theo chuẩn
            `
        }, {
            name: `Sử Dụng Git Và Github Cho Lập Trình Và Thiết Kế Website`,
            detail: `Quản lý source code dễ dàng chuyên nghiệp với Git
            Hạn chế được lỗi xảy ra trong quá trình code
            Được hướng dẫn cách hosting một website đã làm xong lên Github
            `
        }, {
            name: `Học SASS Và Cắt Web Từ File Thiết Kế Photoshop Kiểu SASS`,
            detail: `Nắm bắt hết bản chất của SASS trong thời gian ngắn
            Quản lý các thông số trong một dự án website lớn hiệu quả
            Đọc hiểu mã SASS và đưa lập trình vào CSS bằng cách sử dụng SASS`
        }, {
            name: `Xây Dựng Ứng Dụng Với React - Redux`,
            detail: `Nắm được kiến thức cơ bản về React - Redux
            Biết cách xây dựng những ứng dụng ổn định và có khả năng mở rộng
            Được truyền đạt kinh ngiệm từ anh Nguyễn Anh Phương - một full stack developer làm việc cho BMI System`
        }, {
            name: `Thiết Kế Web Blogger Cơ Bản Tiết Kiệm Và Dễ Dàng`,
            detail: `Thiết kế Web trên nền tảng của Google, không cần hosting
            Tự tạo Web cơ bản, ổn định, phù hợp với doanh nghiệp
            Thiết kế Web tốc độ nhanh, đơn giản, siêu tiết kiệm`
        },
    ],
    [
        {
            name: `Master Photoshop Marketing Cho Marketer`,
            detail: `Làm quen với không gian MAYA, thao tác trong không gian 3D
            Có khả năng tạo ra một bộ phim hoạt hình 3D của riêng mình
            Kỹ năng làm cho nhân vật hoạt hình chuyển động linh hoạt`
        }, {
            name: `Làm Phim Hoạt Hình 3D Thật Dễ Với Autodesk MAYA`,
            detail: `Làm quen với không gian MAYA, thao tác trong không gian 3D
            Có khả năng tạo ra một bộ phim hoạt hình 3D của riêng mình
            Kỹ năng làm cho nhân vật hoạt hình chuyển động linh hoạt
            `
        }, {
            name: `Master Motion Graphic Đỉnh Cao`,
            detail: `Sử dụng các kỹ thuật và công cụ trong Motion Graphic một cách chuyên nghiệp
            Hiểu rõ kiến thức animation, làm phim hoạt hình 2D và design trên After Effects từ cơ bản đến nâng cao
            Nắm rõ các bước thực hiện một dự án đi từ ý tưởng đến thành phẩm`
        }, {
            name: `Tự Học Thiết Kế UX`,
            detail: `Tự xây dựng sản phẩm mới, cải thiện sản phẩm hiện có
            Nắm bắt 7 bước của quy trình thiết kế trải nghiệm người dùng
            Thiết kế trải nghiệm người dùng hữu ích cho bất kì loại hình sản phẩm nào`
        }, {
            name: `Video 3 Ngày - Phiên Bản Smartphone - Học Làm Video Bán Hàng Trong 3 Ngày Bằng Điện Thoại`,
            detail: `Cung cấp các kịch bản đa dạng cho học viên thay vì dùng chung một công thức và rập khuôn kịch bản video
            Áp dụng kiến thức vào thực hành cùng tác giả
            Bỏ túi thêm nhiều phương pháp đa dạng về làm video giới thiệu sản phẩm trong kinh doanh`
        }, {
            name: `Video 3 Ngày - Phiên Bản Smartphone - Học Làm Video Bán Hàng Trong 3 Ngày Bằng Điện Thoại`,
            detail: `Cung cấp các kịch bản đa dạng cho học viên thay vì dùng chung một công thức và rập khuôn kịch bản video
            Áp dụng kiến thức vào thực hành cùng tác giả
            Bỏ túi thêm nhiều phương pháp đa dạng về làm video giới thiệu sản phẩm trong kinh doanh`
        }, {
            name: `Master Text Animation Đỉnh Cao Với After Effects`,
            detail: `Lĩnh hội đầy đủ kiến thức để tạo ra các video quảng cáo có sử dụng hiệu ứng text động
            Có khả năng làm được bất kỳ các video quảng cáo nào có ứng dụng text
            Thỏa sức sáng tạo với những video chữ động`
        }, {
            name: `Autocad Cơ Bản Và Nâng Cao`,
            detail: `Thành thạo phần mềm AutoCad
            Có thể thực hiện được tốt các bản vẽ kỹ thuật bằng phần mềm Autocad
            Có thể vẽ kỹ thuật nhiều ngành khác khau`
        }, {
            name: `Thiết Kế Chuyên Nghiệp Với Photoshop, Indesign Và Illustrator CC 2019`,
            detail: `Cung cấp kiến thức nền tảng, nội dung đơn giản, hiệu quả
            Nắm quy trình làm web cơ bản và cách để hòa nhập vào thị trường công việc
            Tư duy tự học, sử dụng phần mềm một cách khoa học`
        }, {
            name: `Thiết Kế UI/UX Cực Đơn Giản Và Hiệu Quả Với Figma`,
            detail: `Cung cấp kiến thức nền tảng, nội dung đơn giản, hiệu quả
            Nắm quy trình làm web cơ bản và cách để hòa nhập vào thị trường công việc
            Tư duy tự học, sử dụng phần mềm một cách khoa học`
        }, {
            name: `Bật Mí Công Thức Làm Phim Của Các Đạo Diễn Hollywood`,
            detail: `Phương pháp xây dựng kịch bản phim chuyên nghiệp
            Truyền tải các kỹ thuật quay và quy trình làm phim đằng cấp mà các nhà làm phim Hollywood áp dụng
            Các bài tập thực tế về kỹ thuật góc máy, động tác máy và ánh sáng trong phim
            `
        }, {
            name: `Các Bước Xây Dựng Một Video Quảng Cáo Thu Hút`,
            detail: `Nắm vững quy trình xây dựng một quảng cáo hiệu quả, từ tạo nội dung đến phát triển thông điệp
            Xây dựng và triển khai viral clip hiệu quả, thu hút được sự quan tâm
            Chia sẻ thực tế, gần gũi, bổ sung kiến thức quảng cáo hữu ích`
        },
    ],
    [
        {
            name: `Chiến Lược Học Tiếng Anh Cho Người Mất Căn Bản`,
            detail: `Nắm bắt kiến thức căn bản và chuyên sâu ba phạm vi: Từ vựng - Ngữ pháp - Phát âm
            Phương pháp học hiệu quả bốn kỹ năng: Nghe - Nói - Đọc - Viết
            Những bí quyết hữu ích trong quá trình học Tiếng Anh`
        }, {
            name: `Tiếng Trung Ứng Dụng Thực Hành 1`,
            detail: `Tự tin giao tiếp tiếng Trung cơ bản
            Đạt trình độ tiếng Trung tương đương HSK1
            Bài giảng trực quan, dễ hiểu
            `
        }, {
            name: `Phát Âm Tiếng Anh Chân Kinh (Giọng Anh Anh)`,
            detail: `Nắm bắt các quy luật phát âm
            Phát âm thật chuẩn giọng Anh Anh (British accent)
            Phương pháp luyện phát âm thông qua việc tập trung vào các giác quan và tư duy não bộ`
        }, {
            name: `Succeed In IELTS Speaking`,
            detail: `Chiến lược để thể hiện phần thi Nói tốt nhất
            Cải thiện cách diễn đạt câu trả lời của bạn một cách trôi chảy
            Tiếp cận bài giảng với đồ họa đẹp mắt
            `
        }, {
            name: `30 Ngày Thành Thạo Kỹ Năng Viết Email Bằng Tiếng Anh`,
            detail: `Nắm rõ văn hóa viết Email tiếng Anh một cách chuyên nghiệp
            Cấu trúc, mẫu câu áp dụng trực tiếp cho từng trường hợp (để báo giá, báo cáo, đưa ra yêu cầu,...)
            Một số mẹo để soạn Email tiếng Anh chuyên nghiệp chỉ trong vài phút
            `
        }, {
            name: `Succeed In IELTS Writing Task 2`,
            detail: `Video bài giảng với đồ họa đẹp mắt
            Cách phát triển ý tưởng cho bài luận (Brainstorm and Support your Ideas)
            Cách viết bài luận hiệu quả theo từng dạng câu hỏi`
        }, {
            name: `Tiếng Trung Cơ Bản - Phần 2`,
            detail: `Phát âm chuẩn
            Phản xạ nhanh
            Dễ hiểu, dễ nhớ và dễ thực hành`
        }, {
            name: `Chiến Lược Tăng Điểm Kỳ Thi IELTS`,
            detail: `Thành thạo các chiến lược luyện thi IELTS
            Thực hành từng phần ngay trên mạng và biết mình làm đúng hay sai mà không phải tra đáp án
            Được giảng dạy bởi giáo viên có trình độ chuyên môn cao và giàu kinh nghiệm`
        }, {
            name: `Chiến Lược Học TOEIC Từ A Đến Z`,
            detail: `Phát âm chuẩn trong giao tiếp hàng ngày và trong công việc
            Đầy đủ tất cả các nội dung về phát âm căn bản từ cấp độ âm đến cấp độ từ và cấp độ câu
            Khóa học cô đọng, ngắn gọn, mang tính thực tế cao`
        }, {
            name: `Chiến Lược Học TOEIC Từ A Đến Z`,
            detail: `Phát âm chuẩn trong giao tiếp hàng ngày và trong công việc
            Đầy đủ tất cả các nội dung về phát âm căn bản từ cấp độ âm đến cấp độ từ và cấp độ câu
            Khóa học cô đọng, ngắn gọn, mang tính thực tế cao`
        }, {
            name: `Học Tiếng Nhật - Luyện Thi JLPT N4 Ngữ Pháp`,
            detail: `Nắm vững toàn bộ ngữ pháp để vượt qua được kỳ thi năng lực tiếng Nhật N4
            Nâng cao kĩ năng giúp dễ dàng xin việc với mức lương cao hơn tại các công ty Nhật hoặc trung tâm giảng dạy Nhật Ngữ
            Rèn luyện kỹ năng giao tiếp, mở rộng tương lai thăng tiến
            `
        }, {
            name: `Học Tiếng Nhật - Luyện Thi JLPT N3 Ngữ Pháp`,
            detail: `Nắm vững toàn bộ ngữ pháp để vượt qua được kỳ thi năng lực tiếng Nhật N3
            Giao tiếp trôi chảy với người Nhật trong cuộc sống thường ngày
            Tăng cơ hội thăng tiến trong công ty Nhật khi có thể giao tiếp trực tiếp với các sếp người Nhật
            `
        },
    ],
    [
        {
            name: `Xây Dựng Mô Hình Tài Chính Trên Excel`,
            detail: `Nắm vững các hình thức ghi sổ kế toán khác nhau
            Hiểu cách ghi chép một số sổ sách kế toán cơ bản
            Được tặng phần mềm kế toán trên Excel do chính giảng viên tạo lập để sử dụng trong công việc`
        }, {
            name: `Nguyên Lý Kế Toán Cho Người Mới Bắt Đầu Từ A - Z`,
            detail: `Nắm vững các hình thức ghi sổ kế toán khác nhau
            Hiểu cách ghi chép một số sổ sách kế toán cơ bản
            Được tặng phần mềm kế toán trên Excel do chính giảng viên tạo lập để sử dụng trong công việc`
        }, {
            name: `Nghiệp Vụ Xuất Nhập Khẩu Hàng Hóa Và Khai Báo Hải Quan Điện Tử Từ A - Z`,
            detail: `Hiểu biết cách tính toán phí bảo hiểm hàng hóa, cước biển và các loại phí nội địa
            Khai báo thành thạo Tờ khai hải quan xuất nhập khẩu trên hệ thống Hải quan điện tử
            Xử lý các vấn đề phát sinh khác thường xảy ra trong quá trình xuất nhập khẩu và thông quan hàng hóa`
        }, {
            name: `Kế Toán Thuế Của Doanh Nghiệp`,
            detail: `Lộ trình môn học được chia làm các sắc thuế khác nhau, bao gồm cả kiến thức thức lý thuyết và thực hành
            Phần thực hành có giảng viên hướng dẫn trực tiếp trên phần mềm và các chứng từ thật
            Có bài tập hệ thống hóa cho toàn bộ khóa học`
        }, {
            name: `Thực Hành Kế Toán Xây Dựng Trong Doanh Nghiệp`,
            detail: `Tiếp thu kiến thức về dự toán, định mức, quy trình kế toán chi phí giá thành
            Các phương pháp giảng dạy khác nhau giúp nắm vững lý thuyết và tự tin vận dụng vào thực tế
            Đây là khóa học duy nhất trên thị trường về kế toán xây dựng
            `
        }, {
            name: `Cẩm Nang Chứng Từ Kế Toán`,
            detail: `Tích lũy kiến thức về quy trình xử lý chứng từ kế toán trên nền tảng doanh nghiệp thực tế
            Áp dụng kiến thức được ngay trong công việc kế toán doanh nghiệp
            Có thể nhận thêm việc về làm kế toán dịch vụ hoặc tìm kiếm cơ hội tại các công ty lớn hơn
            `
        }, {
            name: `Chinh Phục Các Phần Mềm Kế Toán`,
            detail: `Sở hữu kiến thức về cách sử dụng các phần mềm kế toán phổ biến hiện nay là Fast và Misa
            Học phần mềm trên cơ sở doanh nghiệp giả lập, sát với thực tế
            Cập nhật kiến thức và các văn bản pháp luật mới nhất`
        }, {
            name: `Phân Tích Kỹ Thuật Trong Đầu Tư Chứng Khoán`,
            detail: `Tạo thói quen quản lý vốn đầu tư
            Tiếp thu những kiến thức phân tích kỹ thuật đã được tổng hợp thật logic
            Xác định chính xác được thời điểm mua bán, tăng lợi nhuận, ngăn thua lỗ
            `
        }, {
            name: `Thực Hành Lập Sổ Sách Kế Toán Và Báo Cáo Tài Chính Trên Excel Bằng Chứng Từ Thực Tế`,
            detail: `Khóa học dạy giao dịch Phái sinh đầu tiên trên thị trường chứng khoán Việt Nam
            Được xây dựng và đúc kết từ các giao dịch có lợi nhuận và kinh nghiệm thực tế
            Các phương pháp giúp giảm thiểu thua lỗ trong quá trình giao dịch
            `
        }, {
            name: `Phương Pháp Chọn Crypto Tốt Để Đầu Tư`,
            detail: `Hiểu rõ về nguyên lý hoạt động của thị trường tiền ảo
            Cách đầu tư tiền ảo đúng đắn
            Làm sao để hạn chế rủi ro khi đầu tư tiền ảo`
        }, {
            name: `Cách Kiếm Tiền Với Steemit`,
            detail: `Hiểu rõ về nguyên lý hoạt động của thị trường tiền ảo
            Cách đầu tư tiền ảo đúng đắn
            Phương pháp hạn chế rủi ro khi đầu tư tiền ảo
            `
        }, {
            name: `Phương Pháp Chọn Crypto Tốt Để Đầu Tư`,
            detail: `Khóa học dạy giao dịch Phái sinh đầu tiên trên thị trường chứng khoán Việt Nam
            Được xây dựng và đúc kết từ các giao dịch có lợi nhuận và kinh nghiệm thực tế
            Các phương pháp giúp giảm thiểu thua lỗ trong quá trình giao dịch
            `
        },
    ],
    [
        {
            name: `Nghệ Thuật Tuyển Dụng Để Thành Công Dành Cho Người Lần Đầu Làm Sếp`,
            detail: `Kỹ năng để trở thành nhà tuyển dụng chuyên nghiệp, thu hút người tài
            Chủ động trong cuộc phỏng vấn
            Kỹ thuật đánh giá, lựa chọn ứng viên`
        }, {
            name: `Kỹ Năng Phỏng Vấn Dành Cho Recruiters`,
            detail: `Kỹ năng để trở thành nhà tuyển dụng chuyên nghiệp, thu hút người tài
            Chủ động trong cuộc phỏng vấn
            Kỹ thuật đánh giá, lựa chọn ứng viên
            `
        }, {
            name: `Nghiệp Vụ Hành Chính, Kỹ Năng Văn Phòng Và Quản Lý Nhân Sự Từ A - Z`,
            detail: `Nắm vững các quy định mới nhất về Bảo hiểm xã hội - Bảo hiểm y tế - Bảo hiểm thất nghiệp để bảo vệ quyền lợi người lao động
            Thành thạo cách soạn thảo văn bản hành chính
            Nắm được các kỹ năng về quản lý và tuyển dụng nhân sự
            `
        }, {
            name: `Bí Quyết Quản Trị Nhân Sự`,
            detail: `Tiếp thu các kiến thức căn bản về quản lý nhân sự
            Nắm vững các quy trình hoạt động chức năng trong quản lý nhân sự
            Vận dụng các kiến thức đã học để giải quyết các tình huống nhân sự thực tế
            `
        }, {
            name: `Bí Quyết Tuyển Dụng Từ A - Z`,
            detail: `Xây dựng bảng câu hỏi tuyển dụng hiệu quả
            Xác định rõ các tiêu chí tuyển dụng, tránh cảm tính
            Lựa chọn kênh tuyển dụng phù hợp, tiết kiệm thời gian, công sức, tiền bạc
            `
        }, {
            name: `Bí Quyết Tuyển Dụng Từ A - Z`,
            detail: `Xây dựng bảng câu hỏi tuyển dụng hiệu quả
            Xác định rõ các tiêu chí tuyển dụng, tránh cảm tính
            Lựa chọn kênh tuyển dụng phù hợp, tiết kiệm thời gian, công sức, tiền bạc`
        }, {
            name: `Trở Thành Chuyên Gia Về Hợp Đồng Lao Động`,
            detail: `Chủ động thiết lập các quan hệ lao động một cách đa dạng, linh hoạt theo từng nhu cầu sử dụng cụ thể của chủ doanh nghiệp
            Trở thành chuyên gia trong việc tuyển dụng, sử dụng và chấm dứt quan hệ lao động
            Đề phòng, hạn chế và triệt tiêu hầu hết các rủi ro pháp lý liên quan đến hợp đồng lao động`
        }, {
            name: `Trở Thành Chuyên Gia Về Nội Quy Lao Động Và Xử Lý Kỷ Luật Lao Động`,
            detail: `Cung cấp kiến thức bằng chuyên môn và kinh nghiệm về pháp luật lao động
            Chia sẻ nhiều kỹ năng chuyên môn giúp người học tự chủ động thực hiện các công việc pháp lý về lao động
            Các kiến thức của khóa học đều được xây dựng dựa trên những quy định pháp luật mới nhất và đang có hiệu lực`
        }
    ]
]
const categories = ['Kinh Doanh', 'Kỹ Năng Công Việc', 'Marketing', 'Công Nghệ Thông Tin', 'Mỹ Thuật Đa Phương Tiện', 'Tài Chính', 'Quản Trị Nhân Sự', 'Kiến Trúc Công Trình', 'Anh Ngữ', "Tin Học Văn Phòng", "Quản Lý Kinh Doanh", "Kỹ Năng Mềm"];
const images = [
    fs.createReadStream(path.join(__dirname, '../assets/img/kinh_doanh.jpeg')),
    fs.createReadStream(path.join(__dirname, '../assets/img/ky_nang_cong_viec.jpeg')),
    fs.createReadStream(path.join(__dirname, '../assets/img/cong_nghe_thong-tin.jpeg')),
    fs.createReadStream(path.join(__dirname, '../assets/img/my_thuat_da_phuong_tien.jpeg')),
    fs.createReadStream(path.join(__dirname, '../assets/img/tai_chinh.jpeg')),
    fs.createReadStream(path.join(__dirname, '../assets/img/quan_tri_nhan_su.jpeg')),
    fs.createReadStream(path.join(__dirname, '../assets/img/kien_truc_cong_trinh.jpeg')),
    fs.createReadStream(path.join(__dirname, '../assets/img/anh_ngu.jpeg')),
]
const createCaterogyCourse = async (apiURL) => {

    try {
        /** Login */
        const { data: login } = await axios.post(`${apiURL}/api/auth/login`, { username: 'admin', password: process.env.PASSWORD_ADMIN || '12345678' });
        const token = `Bearer ${login.token}`;
        /** Create category */
        const { data: currentCategories } = await axios.get(`${apiURL}/api/course/category`, { headers: { Authorization: token } });

        if (currentCategories.totalRecord < categories.length) {
            const names = currentCategories.data.map(c => c.name);
            const diff = _.difference(categories, names);
            if (diff.length > 0) {
                for (let i = 0; i < diff.length; i++) {
                    const form = new FormData();
                    form.append('name', diff[i])
                    form.append('detail', `${diff[i]} chất lượng giá tốt giành cho mọi người`)
                    if (images[i]) { form.append('photo', images[i]) }
                    const { data: cate } = await axios({
                        url: `${apiURL}/api/course/category`,
                        method: 'POST',
                        data: form,
                        headers: {
                            Authorization: token,
                            'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
                        }
                    });
                    console.log('-----> Categories:', cate.name);
                }
            }
        }
        console.log('end category import');


        /** Create course */
        const coursesArr = [];
        let dem = 0
        for (let i = 0; i < categories.length; i++) {
            let coursesCategory = courses[i]
            if (coursesCategory) {
                for (let j = 0; j < coursesCategory.length; j++) {
                    await axios.post(`${apiURL}/api/course`, {
                        code: `COURSE_0${dem++}`,
                        name: coursesCategory[j].name,
                        detail: coursesCategory[j].detail,
                        total_sessions: Math.floor(Math.random() * 40) + 10,
                        session_duration: 1.5,
                        session_duration_in: 'hour',
                        price: Math.floor(Math.random() * 1000) + 100,
                        type_cost: constants.COURSE_TYPE_COST.BY_COURSE,
                        fee_currency: '$',
                        is_active: true,
                        course_category_id: i + 1,
                    }, { headers: { Authorization: token } });
                }
            }            
        }
        // await Promise.all(coursesArr)
    } catch (ex) {
        console.log("=========Output==========:>: createCaterogyCourse -> ex", ex)
    }
};
module.exports = createCaterogyCourse;
