/* eslint-disable */

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const UPDATE_DOCTORS_STATE = 'UPDATE_DOCTORS_STATE';


export const updateDoctorState = data => {
  return async(dispatch) => {
    dispatch({
      type: UPDATE_DOCTORS_STATE,
      data: data,
    });
  };
};


export const uploadDoctor = data => {
  return async (dispatch, getState) => {
    const authState = getState().authReducer;
    let imgUrls = [];
    let imgsPaths = data.imgs.map((el, i) => {
      let paths = el.path.split('/');
      let name = paths[paths.length - 1];
      return {path: el.path, name: `${Math.random()}__${name}`};
    });

    for (let i = 0; i < imgsPaths.length; i++) {
      await storage()
        .ref(`${authState.userId}/uploadDoctor/${imgsPaths[i].name}`)
        .putFile(imgsPaths[i].path)
        .then(() => {})
        .catch(error => {
          // console.log(error);
          return {
            status: false,
            message: error.message,
            title: 'Failed to extract images',
          };
        });
      let url;
      await storage()
        .ref(`${authState.userId}/uploadDoctor/${imgsPaths[i].name}`)
        .getDownloadURL()
        .then(uri => {
          url = uri;
        })
        .catch(error => {
          return {
            status: false,
            message: error.message,
            title: 'Failed to uploaded images',
          };
        });
      if (url) {
        imgUrls.push({name: imgsPaths[i].name, url: url});
      }
      url = null;
    }
    delete data.imgs;

    const docRef = await firestore()
      .collection('doctors')
      .doc(authState.userId);
    return await docRef
      .get()
      .then(doc => {
        let hospitalData = {
          ...data,
          imgs: imgUrls,
          created: new Date().valueOf(),
        };
        return docRef.update('hospital', hospitalData);
      })
      .then(() => {
        return {
          status: true,
          message: 'Now you are visible to others as doctors',
          title: 'Success',
        };
      })
      .catch(error => {
        // console.log(error);
        return {
          status: false,
          message: error.message,
          title: 'Failed to uploaded your info',
        };
      });
  };
};

export const extractAllDoctors = () => {
  return async dispatch => {
    return await firestore()
      .collection('doctors')
      .get()
      .then(snaps => {
        let allDocs = [];
        let docs = snaps.docs;
        if (docs.length === 0) {
          return {
            status: false,
            title: 'empty',
          };
        }
        docs.map(doc => {
          let docData = doc.data();
          if (docData.hospital) {
            allDocs.push({
              initailName: docData.initailName,
              fname: docData.fName,
              lname: docData.lName,
              email: docData.email,
              hospitalName: docData.hospital.name, 
              uid: doc.id,
              userType: docData.userType,
            });
          }
        });
        return {status: true, data: allDocs};
      })
      .catch(error => {
        return {
          status: false,
          title: 'Failed',
          message: 'Unable to fetch data',
        };
      });
  };
};

export const extractEachDoc = (uid, userType) => {
  return async dispatch => {
    return await firestore()
      .collection(userType)
      .doc(uid)
      .get()
      .then(doc => {
        let docData = doc.data();
        return {status: true, data: docData};
      })
      .catch(error => {
        return {status: false, title: 'Failed', message: error.message};
      });
  };
};

const imgUploadAndPath = async (mainImgData, localImgObj, userId) => {
  let paths = mainImgData.path.split('/');
  localImgObj.name = `${Math.random()}__${paths[paths.length - 1]}`;

  await storage()
    .ref(`${userId}/articles/${localImgObj.name}`)
    .putFile(mainImgData.path)
    .then(() => {})
    .catch(error => {
      return {
        status: false,
        title: 'Image Failed',
        message: `Upload your top most pic once again or try after some time. ${error.message}`,
      };
    });

  await storage()
    .ref(`${userId}/articles/${localImgObj.name}`)
    .getDownloadURL()
    .then(uri => {
      localImgObj.url = uri;
    })
    .catch(error => {
      return {
        status: false,
        title: 'Image Path Failed',
        message: `Upload your top most pic once again or try after some time. ${error.message}`,
      };
    });
  localImgObj.status = true;
};

export const uploadArticle = data => {
  return async (dispatch, getState) => {
    let authUser = getState().authReducer;
    let topImg = {status: false};
    let middleImg = {status: false};
    let lastImg = {status: false};
    if (data.topImg) {
      await imgUploadAndPath(data.topImg, topImg, authUser.userId);
    }
    if (data.middleImg) {
      await imgUploadAndPath(data.middleImg, middleImg, authUser.userId);
    }
    if (data.lastImg) {
      await imgUploadAndPath(data.lastImg, lastImg, authUser.userId);
    }

    let wholeArticleData = {
      title: data.title,
      firstPara: data.firstPara,
      lastPara: data.lastPara,
      topImg,
      middleImg,
      lastImg,
      created: new Date().valueOf(),
      modified: null,
      id: Math.random(),
    };

    let ref = await firestore()
      .collection(authUser.userType)
      .doc(authUser.userId);
    return await ref
      .get()
      .then(doc => {
        let docData = doc.data();
        docData.articles.push(wholeArticleData);
        return ref.update(docData);
      })
      .then(() => {
        return {
          status: true,
          title: 'Congratulations',
          message: 'Your article has been uploaded.',
        };
      })
      .catch(error => {
        return {
          status: false,
          title: 'Failed to save the article',
          message: `${error.message}`,
        };
      });
  };
};

export const extractAllArticles = () => {
  return async dispatch => {
    return firestore()
      .collection('doctors')
      .get()
      .then(async snaps => {
        let docs = snaps.docs;
        let allArticles = [];
        for (let i = 0; i < docs.length; i++) {
          let data = await docs[i].data();
          // docs.map(doc => {
          // let data = doc.data();

          if (data.articles.length > 0) {
            data.articles.map(art => {
              allArticles.push({
                title: art.title,
                initailName: data.initailName,
                fName: data.fName,
                lName: data.lName,
                articleId: art.id,
                docId: docs[i].id,
                userType: data.userType,
              });
            });
          }
          // })
        }
        return {
          status: true,
          data: allArticles,
        };
      })
      .catch(error => {
        return {
          status: false,
          title: 'Fetching faied',
          message: `Try again or check your network. ${error.message}`,
        };
      });
  };
};

export const extractEachArticle = (userType, docId, articleId) => {
  return dispatch => {
    return firestore()
      .collection(userType)
      .doc(docId)
      .get()
      .then(doc => {
        let docData = doc.data();
        let article = docData.articles.filter(art => art.id == articleId);
        article = {...article[0]};
        if (article) {
          return {
            status: true,
            data: {
              ...article,
              initialName: docData.initailName,
              fName: docData.fName,
              lName: docData.lName,
            },
          };
        } else {
          return {
            status: false,
            title: 'Fetching faied',
            message: `This article no more present now.`,
          };
        }
      })
      .catch(error => {
        return {
          status: false,
          title: 'Fetching faied',
          message: `Try again or check your network. ${error.message}`,
        };
      });
  };
};

export const extractUserAllArticle = () => {
  return (dispatch, getState) => {
    let authReducer = getState().authReducer;

    return firestore()
      .collection('doctors')
      .doc(authReducer.userId)
      .get()
      .then(doc => {
        let docData = doc.data();
        let allArticles = []
        docData.articles.map(art => {
          allArticles.push({
            title: art.title,
            created: art.created,
            userType: 'doctors',
            articleId: art.id,
            docId: doc.id
          })
        })
        return {status: true, data: allArticles};
      })
      .catch(error => {
        return {
          status: false,
          title: 'Fetching faied',
          message: `Try again or check your network. ${error.message}`,
        };
      });
  };
};


export const deleteArticle = (collectionName, docId, articleId) => {
  return async(dispatch) => {
    let ref = await firestore().collection(collectionName).doc(docId);
    return await ref.get().then(doc => {
      let docData = doc.data();
      let articles = docData.articles.filter(art => art.id !== articleId);
      docData.articles = articles;
      return ref.update(docData);
    }).then(() => {
    }).catch(error => {
      return {
        status: false,
        title: 'Unable to delete',
        message: error.message
      }
    })
  }
}

