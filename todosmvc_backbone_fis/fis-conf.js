fis.config.merge({
    roadmap : {
        path : [
            {
                reg : /^\/.+\.(css|js|png|gif|jpg|jpeg)$/i,
                release : "/static/todosmvc_backbone_fis$&"
            },
            {
                reg : /^\/src\/(\w+\.html)$/i,
                release : '/template/todosmvc_backbone_fis/$1'
            }
        ]
    }
});

fis.config.del('modules.optimizer.html');
