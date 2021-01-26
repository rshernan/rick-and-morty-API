import "../css/style.css";
import { render as renderSidebar } from "./components/sidebar/view.js";
import { render as renderInformationDsiplay } from "./components/informationDisplay/view.js";
import { getEpisodes } from "./API/episodes.js";

const main = $("<main></main>");
const button = $("<button class='mainPage__button'> >> </button>");

button.on("click", function () {
    getEpisodes();
    $(".sidebar__section--fold").addClass("sidebar__section--unfold");
    $(".sidebar__buttonClose").show();
    $(".sidebar__buttonMore").show();
});

main.append(button);
main.append(renderInformationDsiplay());

$("body").append(main);
$("body").append(renderSidebar());
