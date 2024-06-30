import { EmblaOptionsType } from 'embla-carousel';
import EmblaCarousel from '@/component/common/embla-carousel/embla-carousel';
import { Card, Image } from 'antd';

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const LIST_DIAMON_DESCRIPTION = [
  {
    title: 'Đá quý',
    description:
      'Đá quý là tên gọi chung của tất cả các khoáng vật quý hiếm. Trong tự nhiên có khoảng hơn ba nghìn khoáng chất, nhưng chỉ có khoảng 1/20 trong số đó, được coi là đá quý và đá bán quý. Đá quý là khoáng chất có thể gia công sử dụng làm đồ trang sức hoặc làm đẹp.',
    imgLink:
      'https://cdn.tgdd.vn/hoi-dap/1412495/da-quy-la-gi-10-loai-da-quy-trang-suc-pho-bien-dep-mat-nhat%20(1).jpg',
  },
  {
    title: 'Kim cương tự nhiên',
    description:
      'Kim cương thiên nhiên (hay tự nhiên) là loại đá quý thường được khai thác tại các mỏ quặng. Khi chưa trải qua quá trình xử lý, chế tác và đánh bóng thì chúng tồn tại ở nhiều kích thước và hình dạng khác nhau. Mặc dù bề mặt của viên kim cương thô, không nhẵn bóng nhưng độ cứng vẫn luôn ở mức hoàn hảo, tuyệt đối.',
    imgLink: 'https://www.baolongan.vn/image/news/2023/20230726/images/11.jpg',
  },
  {
    title: 'Kim cương nhân tạo',
    description:
      'Kim cương nhân tạo có tính chất vật lý và hóa học giống như kim cương thiên nhiên. Kim cương nhân tạo có thành phần là cacbon, trọng lượng riêng là 3,52, chiết suất 2,417. Có những loại kim cương nhân tạo có thể chịu được áp suất gấp 1,3 triệu lần áp suất không khí theo một chiều nhất định, vẫn an toàn dưới áp suất gấp 600.000 lần từ các chiều khác nhau, và rắn hơn kim cương trong tự nhiên. Không giống như kim cương tự nhiên ở dạng tinh thể, kim cương mới thuộc về vật chất vô định hình.',
    imgLink:
      'https://buiducdiamond.com/wp-content/uploads/2021/01/phan-biet-kim-cuong-nhan-tao-va-da-cz.jpg',
  },
];

const CustomerHome = () => {
  return (
    <>
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      <div className='mt-4 d-flex gap-4'>
        {LIST_DIAMON_DESCRIPTION.map((item, index) => (
          <Card
            key={index}
            hoverable
            style={{ width: '33.33%' }}
            cover={<Image alt={item.title} src={item.imgLink} />}
          >
            <Card.Meta title={item.title} description={item.description} />
          </Card>
        ))}
      </div>
    </>
  );
};

export default CustomerHome;
