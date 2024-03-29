import {React, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

export default function AlertButton(props) {

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [knowledgeElements, setKnowledgeElements] = useState([])
  const [dispositions, setDispositions] = useState([])
  const [balance, setBalance] = useState([])
  const [records, setRecords] = useState([])

  const method = async () => {
    const result = await props.method()
    if (result) {
      setTitle(result.title)
      setText(result.text)
      result.knowledgeElements ? setKnowledgeElements(result.knowledgeElements) : setKnowledgeElements([])
      result.dispositions ? setDispositions(result.dispositions) : setDispositions([])
      result.balance ? setBalance(result.balance) : setBalance([])
      result.records ? setRecords(result.records) : setRecords([])
      handleClickOpen()
    }
  } 
    
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button               
        size= { props.text === "?" ? "small" : "medium"}
        color="secondary"
        variant="outlined"
        onClick={method}>
        {props.text}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
          { knowledgeElements.length > 0 &&
          <>
          <h3>
            {"Elementos de conocimiento"}
          </h3>
          <List sx={{ pt: 0 }}>
            {knowledgeElements.map((knowledgeElement, index) => (
              <DialogContentText key = {index} id="alert-dialog-description">
                {knowledgeElement}
              </DialogContentText>
            ))}
          </List>
          </>
          }          
          { dispositions.length > 0 &&
          <>
          <h3>
            {"Disposiciones"}
          </h3>
            <List sx={{ pt: 0 }}>
              {dispositions.map((disposition, index) => (
                <DialogContentText key = {index} id="alert-dialog-description">
                {disposition}
                </DialogContentText>
              ))}
            </List>
          </>
          }
          { records.length > 0 &&
          <>
            <List sx={{ pt: 0 }}>
              {records.map((record, index) => (
                <>
                <DialogContentText key = {"A"+index} id="alert-dialog-description">
                  {record.author + " " + (record.isAuthorized ? "authorized": "not authorized")}
                </DialogContentText>
                <List sx={{ pt: 0 }} key = {"L"+index}>
                  {record.value.map((r, index) => (
                    <ListItemText key = {"E"+index} primary={r} />
                  ))}
                </List>
                </>
              ))} 
            </List>
          </>
          }
          { balance.length > 0 &&
            <List sx={{ pt: 0 }}>
              {balance.map((b, index) => (
                <ListItemText key = {index} primary={b.name+":"+b.amount} />
              ))}
            </List>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
