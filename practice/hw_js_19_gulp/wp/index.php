<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Lesson 19</title>
        <?php wp_head(); ?>
    </head>
    <body>
        <?php include 'wrapper1.inc.php'; ?>
        <?php include 'wrapper2.inc.php'; ?>
        <?php include 'wrapper3.inc.php'; ?>
        <?php include 'wrapper4.inc.php'; ?>
        <?php include 'wrapper5.inc.php'; ?>
        <?php include 'wrapper6.inc.php'; ?>

    <script type="text/tmpl" id="latestNews">
    <%var $array = $data.data;
    for (var i = 0; i < $array.length; i++) {%>
        <div class="content-box clearfix">
            <p class="content-month"><%=$array[i].month%></p>
            <p class="content-day"><%=$array[i].day%></p>
            <img src=<%=$array[i].imageSrc%> alt="" class="content-img">
            <div class="content-info">
            <p class="content-info-title"><a href="#"><%=$array[i].title%></a></p>
            <p class="content-info-by">by <span><%=$array[i].author%></span>Comments (<span><%=$array[i].coments%></span>)</p>
            <p class="content-info-text"><%=$array[i].text%></p>
            </div>
        </div>
    <%}%>
    </script>
    </body>
    <?php wp_footer(); ?>
    </html>
