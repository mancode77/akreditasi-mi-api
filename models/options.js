const modelOptions = {
  toJSON: {
    virtuals: true,
    transform: function (_, obj) {
      obj.id = obj._id

      delete obj._id
      delete obj.__v

      return obj
    }
  },
  toObject: {
    virtuals: true,
    transform: function (_, obj) {
      obj.id = obj._id

      delete obj._id
      delete obj.__v

      return obj
    }
  },
  versionKey: false,
  timestamps: true
}

export default modelOptions
