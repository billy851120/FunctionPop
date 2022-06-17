$ vim register.php

<?php
        include ('include/config.php');
?>
<!doctype html>
<html>
<head>
        <meta charset='utf-8' />
</head>
<body>

<form>
<table>
        <tr>
                <td>登入帳號：</td>
                <td><input type="text" name="login_name" required="required" /></td>
                <td>帳號只能是英文、數字、底線、減號與小數點，其餘字元均不接受</td>
        </tr>
        <tr>
                <td>登入密碼：</td>
                <td><input type="password" name="login_pass11" required="required" /></td>
                <td>至少 5 個位數以上的密碼長度</td>
        </tr>
        <tr>
                <td>確認密碼：</td>
                <td><input type="password" name="login_pass12" required="required" /></td>
                <td>再輸入一次密碼，確認沒有打錯字</td>
        </tr>
        <tr>
                <td>真實姓名：</td>
                <td><input type="text" name="realname" required="required" /></td>
                <td>填寫註冊者的姓名</td>
        </tr>
        <tr>
                <td>電子郵件：</td>
                <td><input type="email" name="u_email" /></td>
                <td>請填慣用的電子郵件</td>
        </tr>
        <tr>
                <td>生日：</td>
                <td><input type="date" name="u_bday" required="required" /></td>
                <td>請務必使用 YYYY-MM-DD 的格式，如 1990-01-20</td>
        </tr>
        <tr>
                <td>性別：</td>
                <td><select name="u_sex">
                        <option value="0">女性</option>
                        <option value="1">男性</option>
                </select></td>
                <td>選擇性別</td>
        </tr>
        <tr>
                <td colspan="3" style="text-align:center; ">
                        <input type="hidden" name="action" value="reg" />
                        <input type="submit" value="送出註冊" />
                </td>
        </tr>

</table>
</form>

</body>
</html>