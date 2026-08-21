const miniTE = function(html: string, items: any[]) {
  //第一引数htmlの<% %>に囲まれた文字列取得
  const placeHolders = [...html.matchAll(/<%\s*(\w+)\s*%>/g)].map(m => m[1]);
  //第一引数htmlの<%table %>に囲まれた文字列取得
  const tablePlaceholders = [...html.matchAll(/<%table\s*(\w+)\s*%>/g)].map(m => m[1]);
  //第一引数htmlの<%list %>に囲まれた文字列取得
  const listPlaceholders = [...html.matchAll(/<%list\s*(\w+)\s*%>/g)].map(m => m[1]);
  //tablePlaceholdersと合致する引数itemsのkey
  let keyTablePlaceholders: any[] = [];
  let tableIndexI: any[] = [];
  //listPlaceholdersに合致する引数itemsのkey
  let keyListPlaceholders: any[] = [];
  let listIndexI: any[] = [];
  let embeded = html;

  //placeHoldersと合致する第二引数のkeyを探し、存在すればplaceHoldersをvalueで置換する
  items.forEach(obj => {
    Object.entries(obj).forEach(([key, value]) => {
      if (placeHolders.includes(key)) {
        const regex = new RegExp(`<%\\s*${key}\\s*%>`, "g");
        embeded = embeded.replace(regex, String(value));
      }
    })
  })

  //第二引数のオブジェクトキーを取得
  const itemsKey = [];
  for (let i = 0; i < items.length; i++) {
    itemsKey.push(Object.keys(items[i]));
  }

  //itemsKeyがtablePlaceholdersと合致するものをkeyTablePlaceholdersとして取得
  for (let i = 0; i < itemsKey.length; i++) {
    for (let j = 0; j < itemsKey[i].length; j++) {
      if (tablePlaceholders.includes(itemsKey[i][j])) {
        keyTablePlaceholders.push(itemsKey[i][j]);
        tableIndexI.push(i);
      }
    }
  }

  //配列keyTablePlaceholdersの各要素に対して、合致するitemsのvalueをtr要素に変換し、placeHoldersを置き換える
  for (let k = 0; k < keyTablePlaceholders.length; k++) {
    if (tableIndexI !== null && keyTablePlaceholders[k] !== null) {

      //keyTablePlaceholdersのオブジェクト配列をもとに、tr/tdのHTMLを組み立てる
      let tableHTML: string = "";
      for (let l = 0; l < items[tableIndexI[k]][keyTablePlaceholders[k]].length; l++) {
        const tdHTML = Object.values(items[tableIndexI[k]][keyTablePlaceholders[k]][l]).map((value) => {
          return `<td>${value}</td>`;
        })
        const trHTML = "<tr>" + tdHTML.join("") + "</tr>";
        tableHTML = tableHTML + trHTML;
      };

      const regexForTable = new RegExp(`<%table\\s*${keyTablePlaceholders[k]}\\s*%>`, "g");

      embeded = embeded.replace(regexForTable, String(tableHTML));
    }
  };

  //itemskeyとlistPlaceholdersを突合し、合致するkeyをkeyListPlaceholders配列に格納
    for (let i = 0; i < itemsKey.length; i++) {
    for (let j = 0; j < itemsKey[i].length; j++) {
      if (listPlaceholders.includes(itemsKey[i][j])) {
        keyListPlaceholders.push(itemsKey[i][j]);
        listIndexI.push(i);
      }
    }
  }

  //<%list %>の部分を、keyListPlaceholdersの各要素に合致する引数itemsのvalueで置換する
    for (let k = 0; k < keyListPlaceholders.length; k++) {
    if (listIndexI !== null && keyListPlaceholders[k] !== null) {

      //keyListPlaceholdersのオブジェクト配列をもとに、tr/tdのHTMLを組み立てる
      let listHTML: string = "";
      for (let l = 0; l < items[listIndexI[k]][keyListPlaceholders[k]].length; l++) {
        const liHTML = Object.values(items[listIndexI[k]][keyListPlaceholders[k]][l]).map((value) => {
          return `<li>${value}</li>`;
        })
        listHTML = listHTML + liHTML.join("");
      };

      const regexForList = new RegExp(`<%list\\s*${keyListPlaceholders[k]}\\s*%>`, "g");

      embeded = embeded.replace(regexForList, String(listHTML));
    }
  };

  return embeded;

}

export default miniTE;