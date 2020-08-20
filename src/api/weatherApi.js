// const KEY = "abb0aae5262dc68ed66664634715c4a8";

export default fetch(
  "http://api.openweathermap.org/data/2.5/weather?q=Novi%20Sad&appid=abb0aae5262dc68ed66664634715c4a8"
)
  .then((response) => response.json)
  .then((data) => console.log(data))
  .catch((error) => {
    console.log(`Something went wrong, here is an error: ${error}`);
  });
