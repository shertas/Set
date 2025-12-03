document.addEventListener("DOMContentLoaded", () => {
    const avatar = document.getElementById("avatar");
    const dropdown = document.getElementById("userDropdown");

    avatar.addEventListener("click", () => {
        dropdown.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
        if (!avatar.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove("active");
        }
    });
});
