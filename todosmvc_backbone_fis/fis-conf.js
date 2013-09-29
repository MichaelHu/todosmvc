fis.config.merge({
    roadmap : {
        path : [
            {
                reg : /^\/.+\.(css|js|png|gif|jpg|jpeg)$/i,
                release : "/static/todos_backbone_fis$&"
            },
            {
                reg : /^\/src\/(\w+\.html)$/i,
                release : '/template/todos_backbone_fis/$1'
            }
        ]
    }
});

fis.config.del('modules.optimizer.html');
