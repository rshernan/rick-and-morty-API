export function render() {
    const sideBar = $(
        "<section class='sidebar__section  sidebar__section--fold'></section>"
    );
    const buttonClose = $("<button class='sidebar__buttonClose'> X </button>");
    const episodesList = $("<ul class='sidebar__ul'></ul>");
    const buttonMore = $("<button class='sidebar__buttonMore'> more </button>");

    buttonClose.on("click", function () {
        $(".sidebar__section--fold").removeClass("sidebar__section--unfold");
        setTimeout(function () {
            $(".sidebar__buttonClose").hide();
            $(".sidebar__ul").empty();
            $(".sidebar__buttonMore").hide();
            $(".sidebar__buttonMore").removeAttr("disabled");
        }, 350);
    });
    buttonClose.hide();
    buttonMore.hide();

    sideBar.append(buttonClose);
    sideBar.append(episodesList);
    sideBar.append(buttonMore);
    return sideBar;
}
