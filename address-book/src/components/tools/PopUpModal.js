// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Modal from '@material-ui/core/Modal';
// import Backdrop from '@material-ui/core/Backdrop';
// import Fade from '@material-ui/core/Fade';

// const useStyles = makeStyles(theme => ({
//   modal: {
//     // display: 'flex',
//     // alignItems: 'center',
//     // justifyContent: 'center',
//     // width: '55%',
//     // margin: `5% 0 0 28%`,
//     overflow: `auto` ,
//   },
//   paper: {
//     width: `800px`,
//     backgroundColor: theme.palette.background.paper,
//     border: '2px solid #000',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//     margin: `5% auto 5% auto`
//   },
// }));

// export default function PopUpModal({children, closeFn, open}) {
//   const classes = useStyles();


//   return (
//     <div>
//         {/* <button style={btnStyle} onClick={openFn}>{btnText}</button> */}
//         <Modal
//             aria-labelledby="transition-modal-title"
//             aria-describedby="transition-modal-description"
//             className={classes.modal}
//             open={open}
//             onClose={closeFn}
//             closeAfterTransition
//             BackdropComponent={Backdrop}
//             BackdropProps={{
//             timeout: 500,
//             }}
//         >
//             <Fade in={open}>
//                 <div className={classes.paper}>
//                     {children}
//                 </div>
//             </Fade>
//         </Modal>
//     </div>
//   );
// }

import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function PopUpModal({ children, closeFn, open, title }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={closeFn}
            >
                <DialogTitle style={{background:`#4c6572`, color:`white`}}>{title}</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>

                <DialogActions style={{background:`#e1e2e1`}}>
                    <Button autoFocus onClick={closeFn} style={{color:`black`}}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}