const mongoose = require('mongoose')

const thumbnailChildren = new mongoose.Schema({
  url: String,
  width: Number,
  height: Number
})

const thumbnailSchema = new mongoose.Schema({
  default: thumbnailChildren,
  medium: thumbnailChildren,
  high: thumbnailChildren,
  standard: thumbnailChildren,
  maxres: thumbnailChildren,

})

const localizedSchema = new mongoose.Schema({
  title: String,
  description: String
})

const statisticsSchema = new mongoose.Schema({
  viewCount: String,
  likeCount: String,
  dislikeCount: String,
  favoriteCount: String,
  commentCount: String

})

const snippetSchema = new mongoose.Schema({
  publishedAt: Date,
  channelId: String,
  title: String,
  description: String,
  thumbnails: thumbnailSchema,
  channelTitle: String,
  tags: [String],
  categoryId: String,
  liveBroadcastContent: String,
  localized: localizedSchema,
  defaultAudioLanguage: String,
})

const playerSchema = new mongoose.Schema({
  embedHtml: String

})

const videoSchema = new mongoose.Schema({
  kind: {
    type: String
  },
  etag: {
    type: String
  },
  id: {
    type: String
  },
  snippet: snippetSchema,
  statistics: statisticsSchema,
  player: playerSchema
})

const trendingFeed = new mongoose.Schema({
  kind: String,
  etag: String,
  items: [videoSchema],
  updatedAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = trendingFeed