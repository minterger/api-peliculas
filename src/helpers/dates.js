// obtener fecha actual
const getDate = () => {
  const date = new Date();
  return date;
};

// comparar si la fecha es mayor por 3 dias
const compareDate = (date) => {
  const dateNow = new Date();
  const diff = dateNow - date;
  const diffDays = Math.abs(Math.ceil(diff / (1000 * 60 * 60 * 24)));
  return diffDays > 1;
};

module.exports = {
  getDate,
  compareDate,
};