const apiCardsRouter = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getCards, getCard, createCard, removeCard, addLike, removeLike,
} = require('../controllers/cards');
const {
  getCardScheme, createCardScheme, removeCardScheme, addLikeScheme, removeLikeScheme,
} = require('../utils/validationSchemes.js');

apiCardsRouter.get('/cards', getCards);
apiCardsRouter.get('/cards/:cardId', celebrate(getCardScheme), getCard);
apiCardsRouter.post('/cards', celebrate(createCardScheme), createCard);
apiCardsRouter.delete('/cards/:cardId', celebrate(removeCardScheme), removeCard);
apiCardsRouter.put('/cards/:cardId/likes', celebrate(addLikeScheme), addLike);
apiCardsRouter.delete('/cards/:cardId/likes', celebrate(removeLikeScheme), removeLike);

module.exports = apiCardsRouter;
