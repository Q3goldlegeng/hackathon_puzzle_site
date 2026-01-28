cd client && npm run build && cd .. && rmdir /s /q public && mkdir public && xcopy client\dist public /s /e /y
