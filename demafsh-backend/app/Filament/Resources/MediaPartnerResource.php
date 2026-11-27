<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MediaPartnerResource\Pages;
use App\Models\MediaPartner;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class MediaPartnerResource extends Resource
{
    protected static ?string $model = MediaPartner::class;

    protected static ?string $navigationIcon = 'heroicon-o-megaphone';

    protected static ?string $navigationGroup = 'Layanan Mahasiswa';

    protected static ?string $navigationLabel = 'Media Partner';

    protected static ?string $modelLabel = 'Media Partner';

    protected static ?string $pluralModelLabel = 'Pengajuan Media Partner';

    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Pengajuan Media Partner')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('organization_name')
                            ->label('Nama Organisasi / Instansi')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('event_name')
                            ->label('Nama Acara / Kegiatan')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('contact_wa')
                            ->label('Nomor WhatsApp Narahubung')
                            ->required()
                            ->maxLength(50),
                        Forms\Components\Select::make('package_type')
                            ->label('Jenis Paket')
                            ->options([
                                'gratis' => 'Gratis',
                                'berbayar' => 'Berbayar',
                                'kolaborasi' => 'Kolaborasi',
                            ])
                            ->required(),
                        Forms\Components\DatePicker::make('event_date')
                            ->label('Tanggal Pelaksanaan')
                            ->native(false),
                        Forms\Components\Select::make('status')
                            ->label('Status Persetujuan')
                            ->options([
                                'menunggu' => 'Menunggu',
                                'disetujui' => 'Disetujui',
                                'ditolak' => 'Ditolak',
                            ])
                            ->default('menunggu')
                            ->required(),
                        Forms\Components\FileUpload::make('poster_file')
                            ->label('Poster / Pamflet Acara')
                            ->image()
                            ->disk('public')
                            ->directory('media-partners')
                            ->visibility('public')
                            ->downloadable()
                            ->openable()
                            ->columnSpanFull(),
                        Forms\Components\Textarea::make('notes')
                            ->label('Catatan / Keterangan Tambahan')
                            ->rows(3)
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                Tables\Columns\ImageColumn::make('poster_file')
                    ->label('Poster')
                    ->disk('public'),
                Tables\Columns\TextColumn::make('organization_name')
                    ->label('Organisasi')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('event_name')
                    ->label('Nama Kegiatan')
                    ->searchable()
                    ->limit(35)
                    ->wrap(),
                Tables\Columns\TextColumn::make('contact_wa')
                    ->label('WhatsApp')
                    ->searchable(),
                Tables\Columns\TextColumn::make('package_type')
                    ->label('Paket')
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => ucfirst($state))
                    ->color(fn (string $state): string => match ($state) {
                        'kolaborasi' => 'primary',
                        'berbayar' => 'amber',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('event_date')
                    ->label('Tanggal Acara')
                    ->date('d M Y')
                    ->sortable(),
                Tables\Columns\TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => ucfirst($state))
                    ->color(fn (string $state): string => match ($state) {
                        'menunggu' => 'warning',
                        'disetujui' => 'success',
                        'ditolak' => 'danger',
                        default => 'gray',
                    }),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label('Status')
                    ->options([
                        'menunggu' => 'Menunggu',
                        'disetujui' => 'Disetujui',
                        'ditolak' => 'Ditolak',
                    ]),
                Tables\Filters\SelectFilter::make('package_type')
                    ->label('Jenis Paket')
                    ->options([
                        'gratis' => 'Gratis',
                        'berbayar' => 'Berbayar',
                        'kolaborasi' => 'Kolaborasi',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListMediaPartners::route('/'),
            'create' => Pages\CreateMediaPartner::route('/create'),
            'edit' => Pages\EditMediaPartner::route('/{record}/edit'),
        ];
    }
}
