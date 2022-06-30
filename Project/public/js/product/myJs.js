var mainImg = document.getElementById("mainImg");
        var smallImg = document.getElementsByClassName("small-img");

        for (let i = 0; i < 4; i++) {
            smallImg[i].onclick = function () {
                mainImg.src = smallImg[i].src;
            }
        }



// Filter for Category



// Filter for Price


// Select Mode 
let Select = document.querySelector("#selectMode");
select.addEventListener("change", selectFun);

function selectFun() {
    const switchValue = this.value;

    switch (switchValue) {
      case "1":
        option_01();
        break;
      case "2":
        option_02();
        break;
      case "3":
        option_03();
        break;
      case "4":
        option_04();
        break;
      default:
        return;
    }
  }

  function option_01() {
    alert("選到 option_01");
  }
  
  function option_02() {
    alert("選到 option_02");
  }
  
  function option_03() {
    alert("選到 option_03");
  }
  
  function option_04() {
    alert("選到 option_04");
  }




