$(document).ready(function(){
    // splash page button brings user to page listing notes
    $(document).on("click", "#enter-site", function(event){
        console.log('clicked');
        location.href = location.href + "notes";
    });
    
    $(document).on("click", ".delete-item", function(event){
        let itemID = $(this).parent().data("id");
        $.ajax(
            {
                url: '/notes/' + itemID,
                type: "DELETE"
            })
        .then(function(){
            console.log('reload');
            location.reload();
        });
    });

    $(document).on("click", "#new-post", function(event){
        event.preventDefault();
        console.log($("#new-header").val().trim());
        console.log($("#new-body").val().trim());
        $.ajax({
            type: "POST",
            url: "/notes",
            data: {title: $("#new-header").val().trim(), body: $("#new-body").val().trim()}
        }).then(function(){
            console.log('great');
            location.reload();
        });
    });

    $(document).on("click", ".edit", function(event){
        event.preventDefault();
        let id = $(this).data('id');
        location.href = "/note/" + id;
    });

    $(document).on("click", ".edit-item", function(event){
        let id = location.href.split("/")[location.href.split("/").length-1];
        $.ajax({
            type: "PUT",
            url: "/note/" + id,
            data: {title: $("#new-header").val().trim(), body: $("#new-body").val().trim()}
        }).then(function(){
            console.log('edited');
            location.href = "/notes";
        });
    });
});


