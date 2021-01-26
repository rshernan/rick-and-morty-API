import { getLocation } from "./location.js";

export function getCharacter(url) {
    axios.get(url).then(function ({ data }) {
        const bio = $(`<div class=characterBio__div></div>`);
        const bioImage = $(
            `<img src=${data.image} alt=${data.name} class=character__image></img>`
        );
        const bioInfo = $(`<div class=characterBioInfo__div></div>`);
        const name = $(`<p class=characterName__p>${data.name}</p>`);
        const extraInfo = $(`<div class=characterExtraInfo__div></div>`);
        const specie = $(`<p>${data.species}</p>`);
        const status = $(`<p>${data.status}</p>`);
        const genre = $(`<p>${data.gender}</p>`);
        const origin = $(`<p class=clickable>${data.origin.name}</p>`);

        origin.on("click", function () {
            getLocation(data.origin.url);
        });

        extraInfo.append(specie);
        extraInfo.append(status);
        extraInfo.append(genre);
        extraInfo.append(origin);

        const episodesList = $(`<div class=episodesList__div></div>`);
        data.episode.forEach(function (episode) {
            axios.get(episode).then(function ({ data }) {
                let card = $(`<div class=episodeList__card></div>`);
                const episode = $(`<p>Episode ${data.id}</p>`);
                const season = $(`<p>${data.episode}</p>`);

                card.append(episode);
                card.append(season);
                episodesList.append(card);
            });
        });

        $(".informationDisplay__section").html("");
        const informationDisplay = $(".informationDisplay__section");
        bio.append(bioImage);
        bio.append(bioInfo);
        bioInfo.append(name);
        bioInfo.append(extraInfo);
        informationDisplay.append(bio);
        informationDisplay.append(episodesList);
    });
}
