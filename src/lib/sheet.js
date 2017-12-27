import config from '../config';

export default {
  auth: (immediate, callback) => {
    window.gapi.auth.authorize({
      'client_id': config.clientId,
      'scope': config.scope,
      'immediate': immediate
    }, callback);
  },

  mapToIssues: (rows) => {
    return rows.map((row, i) => {
      let rowId = i + 3,
          index = i + 1,
          repeatable = row[0],
          title = row[1] && row[1].split('\n'),
          raffle = row[2],
          complexity = row[3],
          requestor = row[4],
          approver = row[5],
          owner = row[6],
          comments = row[7] && row[7].split('\n');

        return {
          rowId,
          index,
          repeatable,
          title,
          raffle,
          complexity,
          requestor,
          approver,
          owner,
          comments
        }
    })
  },

  loadSheet: (callback) => {
    window.gapi.client.load('sheets', 'v4', () => {
      window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: config.spreadsheetId,
        range: 'Ideas!A3:M'
      }).then((response) => {
        // console.log(response.result)
        const rows = response.result.values || [];

        // console.log("this", this.a)
        const issues = this.a.mapToIssues(rows);
        callback({issues})
      }, (response) => {callback(false, response.result.error)});
    })
  },
}