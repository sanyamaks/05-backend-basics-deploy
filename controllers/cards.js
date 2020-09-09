const CardModel = require('../models/card');
const { ForbiddenError } = require('../errors/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  CardModel.find({}).populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.getCard = (req, res, next) => {
  const { cardId } = req.params;

  CardModel.findById(cardId).populate(['owner', 'likes']).orFail()
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  CardModel.create({ name, link, owner: req.user._id })
    .then((newCard) => CardModel.findById(newCard._id).populate(['owner', 'likes'])
      .then((card) => res.send({ data: card })))
    .catch(next);
};

module.exports.removeCard = (req, res, next) => {
  const { cardId } = req.params;
  CardModel.findById(cardId).populate(['owner', 'likes']).orFail()
    .then((probableCard) => {
      if (probableCard.owner._id.toString() !== req.user._id) {
        throw new ForbiddenError('Карточку может удалить только создатель');
      }
      return CardModel.findByIdAndRemove(cardId)
        .orFail()
        .then((card) => {
          res.send({ data: card });
        });
    })
    .catch(next);
};

module.exports.addLike = (req, res, next) => {
  CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).populate(['owner', 'likes']).orFail()
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.removeLike = (req, res, next) => {
  CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).populate(['owner', 'likes']).orFail()
    .then((card) => res.send({ data: card }))
    .catch(next);
};
