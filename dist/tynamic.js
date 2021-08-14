let tynamic = {
    updateTable: function (table_el, table_data, myFunctions = {}) {
        let rmEl = table_el.querySelectorAll('thead,tbody');

        for (let index = 0; index < rmEl.length; index++) {
            rmEl[index].remove();
        }

        let table_el_thead = document.createElement("thead");
        let table_el_thead_tr = document.createElement("tr");
        let table_el_tbody = document.createElement("tbody");

        table_data.options = table_data.options !== undefined ? table_data.options : {};
        table_data.data = table_data.data !== undefined ? table_data.data : null;
        table_data.head = table_data.head !== undefined ? table_data.head : {};
        table_data.body = table_data.body !== undefined ? table_data.body : {};

        if (table_data.data !== null && typeof table_data.data === 'object' && table_data.data[0] !== undefined) {
            table_data.head.data = Object.keys(table_data.data[0]);
            table_data.body.data = table_data.data;
        }


        let table_data_head = table_data.head.data === undefined ? table_data.head : table_data.head.data;
        let table_data_body = table_data.body.data === undefined ? table_data.body : table_data.body.data;

        if (table_data.head.class !== undefined) {
            if (typeof table_data.head.class == 'object') {
                for (let index in table_data.head.class) {
                    let tClass = table_data.head.class[index];
                    table_el_thead.classList.add(tClass);
                }
            } else {
                table_el_thead.classList.add(table_data.head.class);
            }
        }
        if (table_data.body.class !== undefined) {
            if (typeof table_data.body.class == 'object') {
                for (let index in table_data.body.class) {
                    let tClass = table_data.body.class[index];
                    table_el_tbody.classList.add(tClass);
                }
            } else {
                table_el_tbody.classList.add(table_data.body.class);
            }
        }

        //building table header
        for (let index in table_data_head) {
            let data_th_el = table_data_head[index];
            let th_el = document.createElement("th");
            table_el_thead_tr.append(th_el);
            if (typeof data_th_el == 'string') {
                th_el.innerHTML = (data_th_el)
            } else if (typeof data_th_el === 'object') {
                if (data_th_el.tag !== undefined) {
                    th_el = document.createElement(data_td.tag);
                }
                if (data_th_el.html !== undefined) {
                    th_el.innerHTML = data_th_el.html;
                }
                if (data_th_el.class !== undefined) {
                    let thisThCalss = data_th_el.class.split(' ');
                    for (let index in thisThCalss) {
                        th_el.classList.add(thisThCalss[index]);
                    }
                }
                if (data_th_el.data !== undefined && typeof data_th_el.data == 'object') {
                    for (let dataIndex in data_th_el.data) {
                        th_el.dataset[dataIndex] = data_th_el.data[dataIndex];
                    }
                }
                if (data_th_el.attr !== undefined && typeof data_th_el.attr == 'object') {
                    for (let attrIndex in data_th_el.attr) {
                        th_el[attrIndex] = data_th_el.attr[attrIndex];
                    }
                }
                if (data_th_el.f !== undefined) {
                    if (typeof data_th_el.f != 'object') {
                        data_th_el.f = {'name': data_th_el.f}
                    }
                    if (data_th_el.f.name !== undefined) {
                        data_th_el.f = [{
                            'name': data_th_el.f.name,
                            'options': data_th_el.f.options === undefined ? undefined : data_th_el.f.options,
                        }]
                    }
                    for (let index in data_th_el.f) {
                        let thisFunction = data_th_el.f[index];
                        let opt = thisFunction.options === undefined ? undefined : thisFunction.options;
                        myFunctions[thisFunction.name](data_th_el, td_el, opt);

                    }
                }
            }

        }
        table_el_thead.append(table_el_thead_tr);
        table_el.append(table_el_thead);

        //building table body
        if (table_data.body !== undefined) {
            for (let index in table_data_body) {
                let data_tr = table_data_body[index];
                let tr_el = document.createElement("tr");
                for (let index in data_tr) {
                    let data_td = data_tr[index];
                    let td_el = document.createElement("td");
                    if (typeof data_td === 'object' && data_td != null) {
                        if (data_td.tag !== undefined) {
                            td_el = document.createElement(data_td.tag);
                        }
                        if (data_td.html !== undefined) {
                            td_el.innerHTML = data_td.html;
                        }
                        if (data_td.class !== undefined) {
                            let thisTdCalss = data_td.class.split(' ');
                            for (let index in thisTdCalss) {
                                td_el.classList.add(thisTdCalss[index]);
                            }
                        }
                        if (data_td.data !== undefined && typeof data_td.data == 'object') {
                            for (let index in data_td.data) {
                                td_el.dataset[index] = data_td.data[index];
                            }
                        }
                        if (data_td.attr !== undefined && typeof data_td.attr == 'object') {
                            for (let attrIndex in data_td.attr) {
                                td_el[attrIndex] = data_td.attr[attrIndex];
                            }
                        }
                        if (data_td.f !== undefined) {
                            if (typeof data_td.f != 'object') {
                                data_td.f = {'name': data_td.f}
                            }
                            if (data_td.f.name !== undefined) {
                                data_td.f = [{
                                    'name': data_td.f.name,
                                    'options': data_td.f.options === undefined ? undefined : data_td.f.options,
                                }]
                            }
                            for (let index in data_td.f) {
                                let thisFunction = data_td.f[index];
                                let opt = thisFunction.options === undefined ? undefined : thisFunction.options;
                                myFunctions[thisFunction.name](data_td, td_el, opt);

                            }
                        }
                    } else {
                        td_el.innerHTML = data_td;
                    }
                    tr_el.append(td_el)
                }
                table_el_tbody.append(tr_el);
            }
            table_el.append(table_el_tbody);
        }
    }
}