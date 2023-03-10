<?php
    $state = true;
    //Abro el archivo JSON y lo parseo a Objeto
    $comment_json = file_get_contents('../js/comments.json');
    $comment_php = json_decode($comment_json, true);

    
    //Decidir si es un comentario o una réplica a un comentario
    if($_POST['id_comment'] == ""){
        //Si es comentario, lo agrego al array principal
        $index = [];
        foreach ($comment_php as $key => $value) {
            array_push($index, $value['id_comment']);
        }
        $max = max($index);
        array_push($comment_php, array(
            'id_comment'=>$max + 1,
            'id_article'=>(int)$_POST['id_article'],
            'author'=>$_POST['author'],
            'date'=>$_POST['date'],
            'email'=>$_POST['email'],
            'comment'=>$_POST['comment'],
            'replies'=>[]
        ));
    } else{
        //Si es réplica, debo buscar el comentario a que hace réplica y lo agrego al array de réplica de dicho comentario
        foreach ($comment_php as $key => $value) {
            if($value['id_comment'] == $_POST['id_comment']){
                array_push($comment_php[$key]['replies'], array(
                    'author'=>$_POST['author'],
                    'date'=>$_POST['date'],
                    'email'=>$_POST['email'],
                    'comment'=>$_POST['comment']
                ));
            }
        }
    }
    if(!file_put_contents('../js/comments.json', json_encode($comment_php))){
        $state = false;
    } else{
        $state = true;
    }
    echo $state;
?>