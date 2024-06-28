export const setDataLocalStorage = (data: any) => {
  localStorage.setItem('TOKEN', data.loginToken);
  localStorage.setItem('CUSTOMER_NAME', data.customerName);
};
