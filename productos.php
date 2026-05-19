<?php
    $libros = [
                [   
                    'id' => 1,
                    'titulo' => "Narnia - El leon la bruja y el ropero 2",
                    'autor'  => "Cs.Lewis",
                    'imagen' => "images/narnia.png",
                    'precio' => "$60.000",
                    'esFavorito' => false,
                    'anadidoCarrito' => false,

                    
                ],
                 [  
                    'id' => 2,
                    'titulo' => "Narnia - El leon la bruja y el ropero",
                    'autor'  => "Cs.Lewis",
                    'imagen' => "images/narnia.png",
                    'precio' => "$60.000",
                    'esFavorito' => false,
                    'anadidoCarrito' => false,

                ],
                 [  
                    'id' => 3,
                    'titulo' => "Narnia - El leon la bruja y el ropero",
                    'autor'  => "Cs.Lewis",
                    'imagen' => "images/narnia.png",
                    'precio' => "$60.000",
                    'esFavorito' => false,
                    'anadidoCarrito' => false,

                ]];
echo (json_encode($libros));
?>