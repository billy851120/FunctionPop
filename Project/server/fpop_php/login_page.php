<?
$mysqli = new mysqli("127.0.0.1", "root", "", "project");
  echo '連線成功';

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../_css/bootstrap.css">
    <link rel="stylesheet" href="../html/fpop.css">
    <script src="../_js/jquery.min.js"></script>
    <!-- <script src="../_js/popper.min.js"></script> -->
    <script src="../_js/bootstrap.min.js"></script>
    <title>function.pop</title>
    <style>

    </style>
</head>

<body>

    <nav class="navbar sticky-top navbar-expand-lg navbar-light badge-light" style="box-shadow: 5px 1px 5px rgba(105, 105, 105, 0.25);">
        <a class="navbar-brand" href="#" style="padding-left:35%; "><img src="../img/logo_black.svg" width="50px" height="50px">
            <img src="../img/logo_text_black.svg" width="150px" height="50px"></a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">

            <form class="form-inline  ">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style="width: 150px;height: 35px;">
                <button class="btn  my-sm-0" type="submit" style="font-size: 0.9em;"></button>

            </form>
            <ul class="navbar-nav">

                <li class="nav-item active">
                    <a class="nav-link" href="#" onclick="document.getElementById('id01').style.display='block'"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                        </svg>
                        <div id="id01" class="modal">
                            <form class="modal-content animate" action="/action_page.php" method="post">
                                <div class="imgcontainer">
                                    <span onclick="document.getElementById('id01').style.display='none'" class="close">&times;</span>
                                    <img src="../img/logo_black.svg" width="50px" height="50px">
                                    <img src="../img/logo_text_black.svg" width="150px" height="50px">
                                    <h5 style="font-weight: 700;margin-top: 20px;">會員登入</h5>
                                </div>

                                <div class="fp_container">
                                    <input type="text" placeholder="電子郵件*" name="email" required>
                                    <input type="password" placeholder="密碼*" name="psw" required>
                                    <button id="loginbtn" type="submit">登入</button>
                                    <button id="registerbtn" type="button">註冊帳號</button>
                                </div>

                            </form>
                        </div>

                        <script>
                            registerbtn.onclick = function() {

                            }
                            var modal = document.getElementById('id01');
                            window.onclick = function(event) {
                                if (event.target == modal) {
                                    modal.style.display = "none";
                                }
                            }
                        </script>
                    </a>

                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                        </svg></a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="30" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                        </svg></a>
                </li>

            </ul>
        </div>
        <br>


    </nav>
    <div class="" style="margin: 0px auto 100px; border: 1px solid #acacac;
    ">
        <div id="text_login">
            <h6 style="font-weight: 600;text-align: center;">註冊新帳號</h6>
            <p style="text-align: center;">儲存您的資料,享有快速結帳流程、建立願望清單、查看訂單紀錄、查詢退貨紀錄。</p>
            <p style="opacity: 0.6;">*星號欄位必填</p>
            <label>姓名*:</label>
            <input id="userName" type="text" placeholder="名字*">
            <input type="text" placeholder="姓氏">
            <label id="birth">生日*:</label>
            <select name="" id="birthDay">
                <Option id value selected>日</Option>
                <Option id="1" value="1">01</Option>
                <Option id="2" value="2">02</Option>
                <Option id="3" value="3">03</Option>
                <Option id="4" value="4">04</Option>
                <Option id="5" value="5">05</Option>
                <Option id="6" value="6">06</Option>
                <Option id="7" value="7">07</Option>
                <Option id="8" value="8">08</Option>
                <Option id="9" value="9">09</Option>
                <Option id="10" value="10">10</Option>
                <Option id="11" value="11">11</Option>
                <Option id="12" value="12">12</Option>
                <Option id="13" value="13">13</Option>
                <Option id="14" value="14">14</Option>
                <Option id="15" value="15">15</Option>
                <Option id="16" value="16">16</Option>
                <Option id="17" value="17">17</Option>
                <Option id="18" value="18">18</Option>
                <Option id="19" value="19">19</Option>
                <Option id="20" value="20">20</Option>
                <Option id="21" value="21">21</Option>
                <Option id="22" value="22">22</Option>
                <Option id="23" value="23">23</Option>
                <Option id="24" value="24">24</Option>
                <Option id="25" value="25">25</Option>
                <Option id="26" value="26">26</Option>
                <Option id="27" value="27">27</Option>
                <Option id="28" value="28">28</Option>
                <Option id="29" value="29">29</Option>
                <Option id="30" value="30">30</Option>
                <Option id="31" value="31">31</Option>
            </select>
            <select name="" id="birthMonth">
                <Option id value selected>月</Option>
                <Option id="01" value="1">01</Option>
                <Option id="02" value="2">02</Option>
                <Option id="03" value="3">03</Option>
                <Option id="04" value="4">04</Option>
                <Option id="05" value="5">05</Option>
                <Option id="06" value="6">06</Option>
                <Option id="07" value="7">07</Option>
                <Option id="08" value="8">08</Option>
                <Option id="09" value="9">09</Option>
                <Option id="10" value="10">10</Option>
                <Option id="11" value="11">11</Option>
                <Option id="12" value="12">12</Option>
            </select>
            <select name="" id="birthYear">
                <Option id value selected>年</Option>
                <Option id="2004" value="2004">2004</Option>
                <Option id="2003" value="2003">2003</Option>
                <Option id="2002" value="2002">2002</Option>
                <Option id="2001" value="2001">2001</Option>
                <Option id="2000" value="2000">2000</Option>
                <Option id="1999" value="1999">1999</Option>
                <Option id="1998" value="1998">1998</Option>
                <Option id="1997" value="1997">1997</Option>
                <Option id="1996" value="1996">1996</Option>
                <Option id="1995" value="1995">1995</Option>
                <Option id="1994" value="1994">1994</Option>
                <Option id="1993" value="1993">1993</Option>
                <Option id="1992" value="1992">1992</Option>
                <Option id="1991" value="1991">1991</Option>
                <Option id="1990" value="1990">1990</Option>
                <Option id="1989" value="1989">1989</Option>
                <Option id="1988" value="1988">1988</Option>
                <Option id="1987" value="1987">1987</Option>
                <Option id="1986" value="1986">1986</Option>
                <Option id="1985" value="1985">1985</Option>
                <Option id="1984" value="1984">1984</Option>
                <Option id="1983" value="1983">1983</Option>
                <Option id="1982" value="1982">1982</Option>
                <Option id="1981" value="1981">1981</Option>
                <Option id="1980" value="1980">1980</Option>
                <Option id="1979" value="1979">1979</Option>
                <Option id="1978" value="1978">1978</Option>
                <Option id="1977" value="1977">1977</Option>
                <Option id="1976" value="1976">1976</Option>
                <Option id="1975" value="1975">1975</Option>
                <Option id="1974" value="1974">1974</Option>
                <Option id="1973" value="1973">1973</Option>
                <Option id="1972" value="1972">1972</Option>
                <Option id="1971" value="1971">1971</Option>
                <Option id="1970" value="1970">1970</Option>
                <Option id="1969" value="1969">1969</Option>
                <Option id="1968" value="1968">1968</Option>
                <Option id="1967" value="1967">1967</Option>
                <Option id="1966" value="1966">1966</Option>
                <Option id="1965" value="1965">1965</Option>
                <Option id="1964" value="1964">1964</Option>
                <Option id="1963" value="1963">1963</Option>
                <Option id="1962" value="1962">1962</Option>
                <Option id="1961" value="1961">1961</Option>
                <Option id="1960" value="1960">1960</Option>
                <Option id="1959" value="1959">1959</Option>
                <Option id="1958" value="1958">1958</Option>
                <Option id="1957" value="1957">1957</Option>
                <Option id="1956" value="1956">1956</Option>
                <Option id="1955" value="1955">1955</Option>
                <Option id="1954" value="1954">1954</Option>
                <Option id="1953" value="1953">1953</Option>
                <Option id="1952" value="1952">1952</Option>
                <Option id="1951" value="1951">1951</Option>
                <Option id="1950" value="1950">1950</Option>

            </select>
            <!-- <div class="invalid-feedback">必填</div> -->
            <br>
            <label for="userPhone">連絡電話*：</label>
            <input type="tel" id="userPhone" name="userPhone" pattern="^(09)[0-9]{8}$" placeholder="連絡電話">
            <br>限定輸入大寫或小寫英文以及數字，字元最少要7個以上。<br>
            <label for="gender">性別*:</label>
            <select id="gender" name="testcard">
                <option name="gender" value="female">女性</option>
                <option name="gender" value="male">男性</option>
                <option name="gender" value="intersex">不說</option>
            </select>
            <input type="text" name="email" placeholder="電子郵件*">
            <input class="psw" type="password" placeholder="密碼*" pattern="[a-zA-Z0-9]{7,}">
            <input type="password" placeholder="確認密碼*" pattern="[a-zA-Z0-9]{7,}">
            <button style="border: 0px;" type="submit" value="註冊新帳號" id="btnB">註冊新帳號

        </div>
    </div>
 



    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
</body>

</html>