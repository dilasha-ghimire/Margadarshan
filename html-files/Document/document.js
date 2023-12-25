function openNav() {
  document.getElementById("mySidenav").style.width = "220px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

window.addEventListener('resize', function () {
  if (window.innerWidth > 1040) {
    document.getElementById("mySidenav").style.width = "0";
  }
});

function openSideNav() {
  document.getElementById("navigation").style.width = "250px";
}

function closeSideNav() {
  document.getElementById("navigation").style.width = "0";
}