export class IfElse {

    constructor (exp) {
        this._exp = exp;
        this._cases= [];
    }

    get () {
        return this._cases.reduce((carry, c) => {
            const test = !Array.isArray(c.condition)? (this._exp === c.condition) : c.condition.reduce((carry, piece) => {
                    return carry || (this._exp === piece);
                }, false);

            const testInverse = !Array.isArray(c.condition)? (this._exp !== c.condition) : c.condition.reduce((carry, piece) => {
                    return carry && (this._exp !== piece);
                }, true);

            if (carry === undefined && !c.not && (test || c.condition === 'DEFAULT')) {
                if (!!(c.value && c.value.constructor && c.value.call && c.value.apply)) {
                    return c.value();
                } else {
                    return c.value;
                }
            } else if (carry === undefined && c.not && testInverse) {
                if (!!(c.value && c.value.constructor && c.value.call && c.value.apply)) {
                    return c.value();
                } else {
                    return c.value;
                }
            } else {
                return carry;
            }
        }, undefined);
    }

    when (condition, value) {
        this._cases.push({condition: condition, value: value, not: false})
        return this;
    }

    whenNot (condition, value) {
        this._cases.push({condition: condition, value: value, not: true})
        return this;
    }

    default (value) {
        this._cases.push({condition: 'DEFAULT', value: value, not: false})
        return this;
    }

}

export function findByPath(obj, path, orElse) {
    var result = path.split(".").reduce(function(prev, next) {
        if (typeof prev == 'object') {
            return prev[next];
        } else {
            return undefined;
        }
    }, obj);
    if (result !== undefined) {
        return result;
    } else {
        return orElse;
    }
}

export function normalizeUrl(url, type) {
  switch (type) {
    case 'map':
      return mapUrlToObj(url);
    break;
    case 'video':
      return videoUrlToObj(url);
    break;
    case 'sound':
      return normalizeSoundcloud(url);
    break;
    default:
      return {src: url};
    break;
  }
}

export function mapUrlToObj(url) {
    const cartodb = /([a-z]+)\.cartodb.com\/(viz|tables)\/([A-z0-9-]+)\//
    const arcgis = /([a-z]+)\.maps.arcgis.com\/apps\/Viewer\/index\.html\?appid=([A-z0-9-]+)/

    if (url.match(cartodb)) {
      return {src: normalizeCartoDB(url), type: 'map', subType: 'cartodb'};
    } else if (url.match(arcgis)) {
      return {src: normalizeArcGIS(url), type: 'map', subType: 'arcgis'};
    } else {
      return {src: url, type: 'map', subType: false};
    }
}

export function videoUrlToObj(url) {
    var yt = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    var ytEmbed = /^\/\/www\.youtube\.com\/embed\/(\w|-){11}$/;
    var vimeo = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;

    if (url.match(yt)) {
        return {src: normalizeYoutubeURL(url), subType: 'yt', type: 'video'}
    } else if (url.match(ytEmbed)) {
        return {src: url, subType: 'yt', type: 'video'}
    } else if (url.match(vimeo)) {
        return {src: normalizeVimeoURL(url), subType: 'vimeo', type: 'video'}
    } else {
        return {src: url, type: 'video', subType: false};
    }

}

export function normalizeSoundcloud(url) {
    const r = /https:\/\/w\.soundcloud\.com\/player\/\?url=([^"]+)/

    const matches = url.match(r);

    if (matches) {
        return {src: '//w.soundcloud.com/player/?url=' + matches[1], type: 'sound', subType: 'soundcloud'};
    } else {
        return {src: url, type: 'sound', subType: false};
    }
}