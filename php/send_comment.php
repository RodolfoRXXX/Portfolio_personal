<?php
    $state;

    $comment_json = file_get_contents('../js/comments.json');
    $comment_php = json_decode($comment_json, true);

    $comment_php[0]["id_article"] = 4;
    if(!file_put_contents('../js/comments.json', json_encode($comment_php))) {
        $state = false;
    } else{
        $state = true;
    }

    //print_r($comment_php[0]["id_article"]);
    echo $state;

?>