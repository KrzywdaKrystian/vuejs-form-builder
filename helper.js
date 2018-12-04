Array.prototype.swap = function (x,y) {
    var b = this[x];
    this[x] = this[y];
    this[y] = b;
    return this;
};

function createFieldHelper(self, uuid, form) {
    if(form.type === 'input') {
        return {
            uuid: uuid,
            type: "input",
            inputType: "text",
            label: form.label,
            model: uuid,
            buttons: getButtons(self)
        }
    }
    else if(form.type === 'checklist') {
        return {
            uuid: uuid,
            type: "checklist",
            label: form.label,
            model: uuid,
            listBox: true,
            values: [
                "HTML5",
                "Javascript",
                "CSS3",
                "CoffeeScript",
                "AngularJS",
                "ReactJS",
                "VueJS"
            ],
            buttons: getButtons(self)
        }
    }
    else if(form.type === 'switch') {
        return {
            uuid: uuid,
            type: "switch",
            label: form.label,
            model: uuid,
            multi: false,
            readonly: false,
            featured: false,
            disabled: false,
            textOn: "Active",
            textOff: "Inactive",
            buttons: getButtons(self)
        }
    }
    else if(form.type === 'radios') {
        return {
            uuid: uuid,
            type: "radios",
            label: form.label,
            model: uuid,
            values: [
                "James",
                "Nadia",
                "Paul",
                "Christelle",
                "Marc",
                "Marie"
            ],
            buttons: getButtons(self)
        }
    }
    else if(form.type === 'select') {
        return {
            uuid: uuid,
            type: "select",
            label: form.label,
            model: uuid,
            values: [
                "James",
                "Nadia",
                "Paul",
                "Christelle",
                "Marc",
                "Marie"
            ],
            buttons: getButtons(self)
        }
    }
}

function getButtons(self) {
    return [
        {
            classes: "btn btn-info mt-2 mr-2",
            label: "Edytuj",
            onclick: self.editField
        },
        {
            classes: "btn btn-danger mt-2 mr-2",
            label: "Usuń",
            onclick: self.removeField
        },
        {
            classes: "btn btn-success mt-2 mr-2 float-right",
            label: "w górę",
            onclick: self.moveUpField
        },
        {
            classes: "btn btn-primary mt-2 mr-2 float-right",
            label: "w dół",
            onclick: self.moveDownField
        }
    ]
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function prettyJSONHelper(json) {
    var copiedObject = _.cloneDeep(json);
    if (copiedObject) {

        for(var i =0; i < copiedObject.fields.length; i++) {
            copiedObject.fields[i]['buttons'] = null;
        }

        copiedObject = JSON.stringify(copiedObject, undefined, 4);
        copiedObject = copiedObject.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
        return copiedObject.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }
}