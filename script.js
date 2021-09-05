const api_url = "https://game-of-thrones-quotes.herokuapp.com/v1/character";

const searchform = document.getElementById("searchform");

searchform.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  var search = formData.get("search");
  var search = search.toLowerCase();

  //Container for section for quotes container and name container
  const quotessection = document.getElementById("quotessection");

  //Create container for quotes
  const qcontainer = document.createElement("div");
  qcontainer.setAttribute("class", "qcontainer");
  quotessection.prepend(qcontainer);

  //Create container for name of character
  const ncontainer = document.createElement("div");
  ncontainer.setAttribute("class", "ncontainer");
  quotessection.prepend(ncontainer);

  //Function to get quotes with API
  async function getQuotes() {
    try {
      const response = await fetch(`${api_url}/${search}`);
      const data = await response.json();
      const quotes = data[0].quotes;

      //Add name of character into ncontainer
      const name = document.createElement("h3");
      name.setAttribute("class", "bookletterFont");
      name.textContent = `${search}`;
      ncontainer.append(name);

      //For each quote, add to its own qcontainer
      quotes.forEach((quote) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");

        const p = document.createElement("p");
        p.setAttribute("class", "card-text");
        p.textContent = quote;

        qcontainer.append(card);
        card.append(cardBody);
        cardBody.append(p);
      });
    } catch (error) {
      console.log(error);
      alert("Error with API - Check console log");
    }
  }

  getQuotes();
});
