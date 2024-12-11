$(document).ready(function () {
    const apiUrl = "https://jsonplaceholder.typicode.com/posts"; 

    // Fetch items on load
    function fetchItems() {
        $.get(apiUrl, function (data) {
            $("#item-list").empty();
            
            data.slice(0, 10).forEach(item => { // Limiting to 10 items for display
                $("#item-list").append(
                    `<li data-id="${item.id}">
                        ${item.title}
                        <button class="delete-item">Delete</button>
                    </li>`
                );
            });
        }).fail(function () {
            alert("Failed to fetch items. Check API endpoint or network.");
        });
    }

    fetchItems();

    // Add item
    $("#add-item").click(function () {
        const itemName = $("#item-name").val().trim();
        if (!itemName) {
            alert("Please enter an item name.");
            return;
        }

        $.post(apiUrl, { title: itemName, body: '', userId: 1 }, function (newItem) {
            // Mock APIs often don't save; this will show immediate feedback
            $("#item-name").val("");
            $("#item-list").append(
                `<li data-id="${newItem.id}">
                    ${newItem.title}
                    <button class="delete-item">Delete</button>
                </li>`
            );
        }).fail(function () {
            alert("Failed to add item. Check API endpoint or network.");
        });
    });

    // Delete item
    $("#item-list").on("click", ".delete-item", function () {
        const itemId = $(this).parent().data("id");

        $.ajax({
            url: `${apiUrl}/${itemId}`,
            type: "DELETE",
            success: function () {
                $(`li[data-id="${itemId}"]`).remove();
            },
            error: function () {
                alert("Failed to delete item. Check API endpoint or network.");
            }
        });
    });
});
