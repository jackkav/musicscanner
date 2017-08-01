import iTunes from 'react-native-itunes'
import { uniqBy, sortBy, reverse } from 'lodash'
import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, ScrollView } from 'react-native'

export default class musicscanner extends Component {
  state = {
    artists: [],
    tracks: [],
  }
  componentWillMount() {
    iTunes.getTracks().then(tracks => {
      tracks = tracks.map((x, index) => ({ ...x, id: index }))

      //count number of duplicate artists and sort by that number
      const frequency = tracks
        .map(({ albumArtist }) => albumArtist)
        .reduce((names, albumArtist) => {
          const count = names[albumArtist] || 0
          names[albumArtist] = count + 1
          return names
        }, {})
      const keys = Object.keys(frequency)
      const artistsByNumberOfTracks = keys.map(x => ({
        albumArtist: x,
        count: frequency[x],
      }))
      sortedArtistsByNumberOfTracks = reverse(
        sortBy(artistsByNumberOfTracks, 'count'),
      )
      const uniqTracks = uniqBy(tracks, 'albumArtist')
      this.setState({ tracks: sortedArtistsByNumberOfTracks })
      console.log(sortedArtistsByNumberOfTracks.map(x => x.count))
    })
  }
  render() {
    return (
      <ScrollView>
        {this.state.tracks.map(x =>
          <Text key={x.id}>
            {x.albumArtist},{x.count},
          </Text>,
        )}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    // textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})

AppRegistry.registerComponent('musicscanner', () => musicscanner)
