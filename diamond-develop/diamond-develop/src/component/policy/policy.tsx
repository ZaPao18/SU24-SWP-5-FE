import { Card } from 'antd';

const LIST_POLICY = [
  {
    title: 'Phạm Vi Giám Định',
    listContent: [
      'Cửa hàng chấp nhận giám định mọi viên kim cương, không giới hạn nguồn gốc mua sắm.',
      'Cửa hàng chấp nhận giám định mọi viên kim cương, không giới hạn nguồn gốc mua sắm.',
    ],
  },
  {
    title: 'Quy Trình Giám Định',
    listContent: [
      'Khách hàng đặt lịch giám định thông qua website, điện thoại hoặc trực tiếp tại cửa hàng.',
      'Sau khi đặt lịch, nhân viên của cửa hàng sẽ chủ động đến tận nơi để nhận kim cương từ khách hàng.',
      'Giám định viên sẽ sử dụng các thiết bị chuyên dụng như kính hiển vi, máy đo độ tinh khiết, máy đo màu sắc, và các công cụ khác để kiểm tra kim cương.',
      'Kim cương sẽ được giám định tại cửa hàng hoặc tại phòng giám định chuyên nghiệp của chúng tôi.',
    ],
  },
  {
    title: 'Thời Gian Giám Định (Tùy thuộc vào gói lựa chọn)',
    listContent: [
      'Gói tiêu chuẩn: Thời gian giám định là 3 ngày làm việc.',
      'Gói nhanh: Thời gian giám định là 1 ngày làm việc.',
      'Gói khẩn cấp: Thời gian giám định là 4 giờ làm việc.',
    ],
  },
  {
    title: 'Chi Phí Giám Định',
    listContent: [
      'Miễn phí giám định cho các viên kim cương mua tại cửa hàng.',
      'Các viên kim cương không mua từ cửa hàng sẽ có phí giám định tùy theo trọng lượng và giá trị của viên kim cương.',
      'Chi phí giám định cũng phụ thuộc vào gói dịch vụ mà khách hàng lựa chọn.',
    ],
  },
  {
    title: 'Chứng Thư Giám Định',
    listContent: [
      'Sau khi giám định, cửa hàng sẽ cung cấp cho khách hàng chứng thư giám định chi tiết về viên kim cương bao gồm: trọng lượng (carat), màu sắc, độ tinh khiết, kiểu cắt, và các thông tin liên quan khác.',
    ],
  },
  {
    title: 'Cam Kết Chất Lượng',
    listContent: [
      'Cửa hàng cam kết các viên kim cương được bán và giám định đều đúng với mô tả và đạt tiêu chuẩn chất lượng cao nhất.',
    ],
  },
  {
    title: 'Chính Sách Bảo Hành',
    listContent: [
      'Cửa hàng cung cấp bảo hành giám định kim cương trong vòng 1 năm kể từ ngày mua hàng.',
      'Cửa hàng cung cấp bảo hành giám định kim cương trong vòng 1 năm kể từ ngày mua hàng.',
    ],
  },
  {
    title: 'Chính Sách Niêm Phong',
    listContent: [
      'Chính Sách Niêm Phong',
      'Quý khách cần liên hệ trực tiếp với cửa hàng để làm thủ tục nhận lại kim cương.',
    ],
  },
];

const Policy = () => {
  return (
    <div style={{ margin: '80px' }}>
      <Card title='Chính Sách Giám Định Kim Cương'>
        {LIST_POLICY.map((item, index) => (
          <Card
            key={index}
            type='inner'
            title={`${index + 1}. ${item.title}`}
            style={{ marginTop: 16 }}
          >
            <ul>
              {item.listContent.map((ele, i) => (
                <li key={i}>{ele}</li>
              ))}
            </ul>
          </Card>
        ))}
      </Card>
    </div>
  );
};

export default Policy;
