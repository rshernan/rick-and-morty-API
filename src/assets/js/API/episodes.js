import { getCharacter } from "./characters.js";

export function getEpisodes(url = "https://rickandmortyapi.com/api/episode") {
    axios
        .get(url)
        .then(function ({ data }) {
            data.results.forEach((episode) => {
                let item = $(`<li class="sidebar__li"></li>`).text(
                    `${episode.id} ${episode.name}`
                );
                item.on("click", function () {
                    const title = $(
                        `<h1 class=informationDisplay__title></h1>`
                    ).text(episode.name);
                    const extraInfo = $(`<p></p>`).text(
                        episode.air_date + " | " + episode.episode
                    );
                    const characterList = $(
                        `<section class=characterList__section></section>`
                    );
                    episode.characters.forEach((character) => {
                        axios
                            .get(character)
                            .then(function ({ data }) {
                                let card = $(
                                    `<div class=characterList__card></div>`
                                );
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
                    container.append(title);
                    container.append(extraInfo);
                    container.append(characterList);
                });
                $(`.sidebar__ul`).append(item);
            });
            if (data.info.next != null) {
                $(".sidebar__buttonMore").off();
                $(".sidebar__buttonMore").on("click", function () {
                    getEpisodes(data.info.next);
                });
            } else {
                $(".sidebar__buttonMore").attr("disabled", "disabled");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
