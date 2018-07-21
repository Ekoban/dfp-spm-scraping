//Obtenir la table:
const tabRaw = document.getElementsByClassName("tab-button _ngcontent-NPM-11 _nghost-NPM-27");
const tableau = document.querySelectorAll(".particle-table-row");
/*const tabNames = new Array(0);*/
const enfants = new Array(0);

//Pour s'assurer que la tab est bien "Approved Publishers";
const currentTab = () => {
    let allTabsStatus = [];
    for (i = 0; i < tabRaw.length; i++) {
        let tab = tabRaw[i];
        let status = {
            name: tab.firstChild.innerHTML,
            active: tab.getAttribute('aria-selected')
        }
        allTabsStatus.push(status);
    }

    let activeTabObj = allTabsStatus.filter(tabx => {
        return tabx.active == "true"
    })[0].name;

    return activeTabObj;
}

//Pour chaque élément du tableau, 
//déterminer sur quel onglet on est puis créer une array:
const extractApprovedPublishers = (table) => {
    let emptyArray = [];
    for (var i = 0; i < table.length; ++i) {
        let line = table[i];
        if (currentTab() == "Approved") {
            let child = [
                line.childNodes[1].innerText.slice(0, -1),
                line.childNodes[2].innerText,
                line.childNodes[3].innerText
            ];
            emptyArray.push(child);
        }
        else if (currentTab() == "Invited") {
            let child = [
                line.childNodes[1].innerText.slice(0, -1),
                line.childNodes[2].innerText,
            ];
            emptyArray.push(child);
        } else {
            break;
            return alert("Invalid tab ! Please move to the Invited or Approved tab.")
        }
    }
    return emptyArray;
}

//Créer un CSV à partir de l'array créée puis le télécharger:
const downloadCSV = (data) => {
    let csv = 'Company name,Contact email,Contact name\n';
    data.forEach(row => {
        csv += row.join(',');
        csv += "\n";
    });

    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    	if (currentTab() == "Approved") {
    		hiddenElement.download = 'ApprovedPublishers.csv';
    		hiddenElement.click();
    	}
    	else if (currentTab() == "Invited"){
    		hiddenElement.download = 'InvitedPublishers.csv'
    		hiddenElement.click();
    	}
    	else {
    		return alert("Invalid tab ! Please move to the Invited or Approved tab.")
    	};
}


console.log(currentTab());
const publishers = extractApprovedPublishers(tableau);
downloadCSV(publishers);