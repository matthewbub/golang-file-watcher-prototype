//
//  ContentView.swift
//  ucan-documents
//
//  Created by Matthew Bub on 9/9/23.
//

import SwiftUI

struct ContentView: View {
    @Binding var document: ucan_documentsDocument

    var body: some View {
        TextEditor(text: $document.text)
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView(document: .constant(ucan_documentsDocument()))
    }
}
