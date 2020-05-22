function createDb() {
    var db_name = 'NotesDB';
    var db_version = '1.0';
    var db_describe = 'Some Notes';
    var db_size = 2048;
    var db = openDatabase(db_name, db_version, db_describe, db_size, function (db) {
        console.log(db);
        console.log("Database opened Successfully! Or created for the first time !");
    });
    return db;
}

function createTable(db) {
    db.transaction(function (tx) {
        tx.executeSql('create table notes(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, data text)', [], function (transaction, result) {
            console.log(result);
            console.log('Table created Successfully!');
        }, function (transaction, error) {
            console.log(error);
        });
    }, transError, transSuccess);
}

function transError(t, e) {
    console.log(t);
    console.log(e);
    console.error("Error occured ! Code:" + e.code + " Message : " + e.message);
}

function transSuccess(t, r) {
    console.info("Transaction completed Successfully!");
    console.log(t);
    console.log(r);
}

function insertRecords(db, desc) {
    if (db) {
        db.transaction(function (tx) {
            tx.executeSql('insert into notes(data) values(?)', [desc], function (transaction, result) {
                console.log(result.insertId);
            }, function (transaction, error) {
                console.log(error);
            });
        }, transError, transSuccess);
    } else {
        console.log('No Database man! wait creating it for you!');
        createDb();
    }
}

function displayNotes(db) {
    db.transaction(function (tx) {
        tx.executeSql("SELECT id,data FROM notes", [], function (sqlTransaction, sqlResultSet) {
            var rows = sqlResultSet.rows;
            var len = rows.length;
            var count = 0;
            for (var i = 0; i < len; i++) {
                var cur_item = rows[i]; // or u can use the item methid ---> var cur_item = rows.item(i);
                console.log("the id is : " + cur_item.id + " the data is : " + cur_item.data);
                var wea = document.getElementById('notes');
                var x = document.createElement("div");
                var text = "'" + cur_item.data + "'";
                x.innerHTML = '<ons-list-item><div class="listItem"><div>' + cur_item.data + '</div><div style="width: 30%;"><ons-button id="' + cur_item.id + '" onclick="showTemplateDialog(id,' + text + ')"><ons-icon icon="edit"></ons-icon></ons-button><ons-button style="background-color:orangered;margin-left: 15px;" id="' + cur_item.id + '" onclick="deleteN(id)"><ons-icon icon="trash"></ons-icon></ons-button></div></div></ons-list-item>';
                wea.appendChild(x);
            }
            console.log('Done!!!');
        }, function (sqlTransaction, sqlError) {
            switch (sqlError.code) {
                case sqlError.SYNTAX_ERR:
                    console.error("Syntax error has occurred. " + sqlError.message);
                    break;
                default:
                    console.error("Other error");
            }
        });
    }, transError, transSuccess);
}

function UpdateNote(db, id, desc) {
    db.transaction(function (tx) {
        tx.executeSql('update notes set data=? where id=?', [desc, id], function (transaction, result) {
            console.log(result);
            console.info('Record Updated Successfully!');
        }, function (transaction, error) {
            console.log(error);
        });
    }, transError, transSuccess);
}

function deleteNote(db, id) {
    db.transaction(function (tx) {
        tx.executeSql('delete from notes where id=?', [id], function (transaction, result) {
            console.log(result);
            console.info('Record Deleted Successfully!');
        }, function (transaction, error) {
            console.log(error);
        });
    }, transError, transSuccess);
}

function upv(){
    var x = document.getElementById('notes');
    x.innerHTML='';
    displayNotes(db);
}

function create(data) {
    insertRecords(db, data);
    upv();
    
}
function edit(data) {
    UpdateNote(db, sendID, data);
    upv();
}
function deleteN(id) {
    deleteNote(db, id);
    upv();
}
var db = createDb();

createTable(db);

displayNotes(db);

var sendID = '';

function showTemplateDialog(id, value) {
    var dialog = document.getElementById('my-dialog');
    sendID = id;
    if (dialog) {
        dialog.show();
        var e = document.getElementById("editText");
        e.innerHTML = '<ons-input id="newText" modifier="underbar" value="'+value+'" float></ons-input>'
    } else {
        ons.createElement('dialog.html', { append: true })
            .then(function (dialog) {
                var e = document.getElementById("editText");
                e.innerHTML = '<ons-input id="newText" modifier="underbar" value="'+value+'" float></ons-input>'
                dialog.show();
            });
    }
};
var editD= function(){
    var nt = document.getElementById('newText');
    console.log('id',nt.value);
    edit(nt.value);
    hideDialog();
}
var createD = function(){
    var nt = document.getElementById('newTextC');
    console.log('id',nt.value);
    create(nt.value);
    hideDialogC();
}
var hideDialog = function () {
    document
        .getElementById('my-dialog')
        .hide();
};

function showCreateDialog(id, value) {
    var dialog = document.getElementById('my-dialogC');
    sendID = id;
    if (dialog) {
        dialog.show();
        var e = document.getElementById("editTextC");
        e.innerHTML = '<ons-input id="newTextC" modifier="underbar" placeholder="Write..." float></ons-input>'
    } else {
        ons.createElement('dialogC.html', { append: true })
            .then(function (dialog) {
                var e = document.getElementById("editTextC");
                e.innerHTML = '<ons-input id="newTextC" modifier="underbar" placeholder="Write..." float></ons-input>'
                dialog.show();
            });
    }
};
var hideDialogC = function () {
    document
        .getElementById('my-dialogC')
        .hide();
};