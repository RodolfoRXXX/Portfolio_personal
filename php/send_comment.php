<?php

    $comment_json = file_get_contents(__DIR__.'js/comments.json');
    var_dump($comment_json);

    $comment_php = json_decode($comment_json, true);

    echo 'ok';

?>