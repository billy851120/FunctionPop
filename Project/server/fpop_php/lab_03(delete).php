<?php

$mysqli = new mysqli("127.0.0.1", "root", "", "project");

if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: " . $mysqli->connect_error;
    exit();
} else;



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
        .sidenav {
            height: 100%;
            width: 250px;
            position: fixed;
            z-index: 1;
            top: 0;
            left: 0;
            background-color: rgb(255, 255, 255);
            overflow-x: hidden;
            padding-top: 100px;
            box-shadow: 1px 1px 5px rgba(105, 105, 105, 0.25);
        }

        .main {
            margin-left: 250px;
            /* Same as the width of the sidenav */
            font-size: 28px;
            /* Increased text to enable scrolling */
            padding: 20px 50px;
            font-size: small;
        }
    </style>
</head>

<body>


    <nav class="navbar sticky-top navbar-expand-lg navbar-light badge-light" style="box-shadow: 5px 1px 5px rgba(105, 105, 105, 0.25);">
        <a class="navbar-brand" href="#"><img src="../img/logo_black.svg" width="50px" height="50px">
            <img src="../img/logo_text_black.svg" width="150px" height="50px"></a>

    </nav>
    <nav class="sidenav">
        <!-- 選單 -->
        <ul class="nav nav-pills flex-column mb-auto">
            <li class="">
                <a href="server_side.php" class="nav-link text-black" aria-current="page">
                    <i class="fa-solid fa-house" style="padding: 10px;"></i>
                    首頁
                </a>
            </li>
            <li>
                <a href="member.php" class="nav-link text-black">
                    <i class="fa-solid fa-file-invoice" style="padding: 10px;"></i>
                    訂單
                </a>
            </li>


        </ul>
        <!--/ 選單 -->
    </nav>

    <div class="main">
        <div class="container">
            <h5>會員管理系統</h5>
            <form method="$_GET" action="lab_02.php">
                搜尋:
                <input type="text" name="no">
                <button type="submit" value="">送出</button>
            </form>

            <?php
            $sql = "SELECT * FROM `client_new` ORDER BY `client_id`ASC;";
            
            $result = mysqli_query($mysqli, $sql);
            $row = mysqli_fetch_array($result);
          

            echo '共有' . mysqli_num_rows($result) . '位';
            echo "<table width=100% cellpadding=10px>";

            echo
            "
            <tr class='bg-secondary'>
            <td>身分證</td>
            <td>名字</td>
            <td>信箱</td>
            <td>電話</td>
            <td>地址</td>
            <td>刪除</td>
            </tr>";   

            while ($row = mysqli_fetch_array($result)) {
                echo
                "<tr>
            <td>$row[client_id]</td>
            <td>$row[client_name]</td>
            <td>$row[email]</td>
            <td>$row[phone]</td>
            <td>$row[address]</td>
            <td><a href=lab_03(delete).php?=del=$row[0]>刪除</a></td>
            </tr>";
            }
            echo "</table>";

            if($_GET['del']){
                $a = $_GET['del'];
                $s="DELETE FROM `client_new` WHERE `client_id`=$a";
                mysqli_query($mysqli, $s);
                echo '你成功刪除:'
                .mysqli_affected_rows($mysqli, $sql);
            }



            ?>

        </div>
    </div>

</body>

</html>