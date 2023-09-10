//
//  ucan_documentsApp.swift
//  ucan-documents
//
//  Created by Matthew Bub on 9/9/23.
//

import SwiftUI

@main
struct ucan_documentsApp: App {
    var body: some Scene {
        DocumentGroup(newDocument: ucan_documentsDocument()) { file in
            ContentView(document: file.$document)
        }
    }
}
