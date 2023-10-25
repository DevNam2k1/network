class UciSection {
    constructor() {
        this.order = 1
        this.sectionType = ''
        this.sectionName = ''
        this.options = [{name: '', value: ''}]
        this.lists = [{name: '', values:[{order: 1, value: ''}]}]
    }
}
class UciConfig {
    constructor() {
        this.sections = [new UciConfig()]
    }
}
class UciCollection {
    constructor() {
        this.configs = [new UciSection()]
    }
}