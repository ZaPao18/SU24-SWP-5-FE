export const transformServiceBooking = (serviceId: string) => {
  switch (serviceId) {
    case '1':
      return 'Gói cơ bản';

    case '2':
      return 'Gói nâng cao';

    case '3':
      return 'Gói cao cấp';

    default:
      return 'Gói không xác định';
  }
};

export const transformCost = (serviceId: string) => {
  switch (serviceId) {
    case '1':
      return '1.000.000đ';

    case '2':
      return '2.000.000đ';

    case '3':
      return '3.000.000đ';

    default:
      return 'Không xác định';
  }
};
