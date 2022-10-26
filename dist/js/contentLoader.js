class Content {
    constructor(options){
        const {
            url,
        } = options;
    }
}

class ContentLoader {
    constructor(options){
        const {
            url,
        } = options;

        if (!url) {
            throw('no URL defined for content loader');
        }
        Object.assign(this, {url, beforeInsert, afterInsert, beforeRemove, afterRemove});

        this.contents = {};
    }

    getContent(options) {
        return new Promise((resolve) => {
            const {name, url, wrapperClasses, wrapperId } = options;
            fetch(url)
            .then((response) => {
                return response.text();
            })
            .then((content) => {
                const wrapper = document.createElement('div');
                if (wrapperClasses !== undefined) {
                    for (let className of wrapperClasses) {
                        wrapper.classList.add(className)
                    };
                }
                if (wrapperId !== undefined) wrapper.id = wrapperId;
                wrapper.innerHTML = content;
                this.contents[name] = wrapper;
                resolve(wrapper);
            });
        });
    }
}
