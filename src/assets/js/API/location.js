export function getLocation(url) {
    axios.get(url).then(function ({ data }) {
        const planetName = $(
            `<p class=informationDisplay__title>${data.name}</p>`
        );
        const extraInfo = $(`<p>${data.type} | ${data.dimension}</p>`);
        const characterList = $(
            `<section class=characterList__section></section>`
        );
        data.residents.forEach((character) => {
            axios
                .get(character)
                .then(function ({ data }) {
                    let card = $(`<div class=characterList__card></div>`);
                    const image = $(
                        `<img src=${data.image} alt=${data.name} class=characterList__image></img>`
                    );
                    const name = $(`<p>${data.name}</p>`);
                    const specie = $(`<p>${data.species}</p>`);
                    const status = $(`<p>${data.status}</p>`);

                    card.on("click", function () {
                        getCharacter(data.url);
                    });

                    card.append(image);
                    card.append(name);
                    card.append(specie);
                    card.append(status);
                    characterList.append(card);
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
        const container = $(".informationDisplay__section");
        container.html("");
        container.append(planetName);
        container.append(extraInfo);
        container.append(characterList);
    });
}
